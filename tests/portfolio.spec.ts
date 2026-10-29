import { expect, test } from '@playwright/test'

test('навигация, тема и ссылки работают', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: /Борис Басов/ })).toBeVisible()

  const themeButton = page.getByRole('button', { name: /тёмную тему/ })
  await themeButton.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  if (await page.getByRole('button', { name: 'Меню' }).isVisible()) {
    await page.getByRole('button', { name: 'Меню' }).click()
  }
  await page.getByRole('link', { name: 'Проекты', exact: true }).click()
  await expect(page.locator('#work')).toBeInViewport()
  await expect(page.getByRole('heading', { name: /Дизайн-система.*работает.*продукте/ })).toBeVisible()

  await expect(page.getByRole('link', { name: /borbasov2003/ })).toHaveAttribute('href', 'mailto:borbasov2003@yandex.ru')
  await expect(page.getByRole('link', { name: 'PDF ↓' })).toHaveAttribute('download', '')
  await expect(page.getByRole('link', { name: 'DOCX ↓' })).toHaveAttribute('download', '')
})

test('страница не создаёт горизонтальный overflow', async ({ page }) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('./')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, `overflow при ширине ${width}px`).toBeLessThanOrEqual(1)
  }
})

test('файлы резюме доступны', async ({ request }) => {
  for (const file of ['Boris_Basov_Frontend_Developer_React.pdf', 'Boris_Basov_Frontend_Developer_React.docx']) {
    const response = await request.get(`downloads/${file}`)
    expect(response.ok()).toBeTruthy()
  }
})

test('изображения загружаются, reduced motion соблюдается', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  const lazyImages = page.locator('img[loading="lazy"]')
  for (let index = 0; index < await lazyImages.count(); index += 1) {
    const image = lazyImages.nth(index)
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true)
  }
  const failedImages = await page.locator('img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).length)
  expect(failedImages).toBe(0)
  const movement = await page.locator('.reveal').first().evaluate((element) => getComputedStyle(element).transform)
  expect(movement).toBe('none')
})

test('кейс SENSE использует реальные доступные визуалы', async ({ page }) => {
  await page.goto('./')
  const assets = page.locator('[data-sense-asset]')
  await expect(assets).toHaveCount(4)
  for (let index = 0; index < await assets.count(); index += 1) {
    const image = assets.nth(index)
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('alt', /\S+/)
    await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true)
  }
  await expect(page.locator('#work')).toContainText('Коммерческий проект. Исходники закрыты.')
})

test('кейсы идут в порядке SENSE, Зацеп, Музей, Коди.АИ', async ({ page }) => {
  await page.goto('./')

  const sectionOrder = await page.locator('main section').evaluateAll((sections) =>
    sections.map((section) => section.getAttribute('data-museum-case') !== null
      ? 'museum'
      : section.hasAttribute('data-zacep-case')
        ? 'zacep'
        : section.classList.contains('sense-case')
        ? 'sense'
        : section.classList.contains('kodi-case')
          ? 'kodi'
          : null).filter(Boolean),
  )
  expect(sectionOrder).toEqual(['sense', 'zacep', 'museum', 'kodi'])
  await expect(page.getByText('photos-app', { exact: true })).toHaveCount(0)

  const assets = page.locator('[data-museum-asset]')
  await expect(assets).toHaveCount(5)
  for (let index = 0; index < await assets.count(); index += 1) {
    const image = assets.nth(index)
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('alt', /\S+/)
    await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true)
  }
})

test('Зацеп доступен по прямой ссылке и ведёт к исходным материалам', async ({ page }) => {
  await page.goto('./#zacep')
  const zacep = page.locator('#zacep')
  await expect(zacep).toBeInViewport()
  await expect(zacep.getByRole('heading', { level: 2 })).toContainText('от макета в Figma до работающего сайта')
  await expect(zacep.getByRole('link', { name: /Открыть сайт/ })).toHaveCount(2)
  for (const link of await zacep.getByRole('link', { name: /Открыть сайт/ }).all()) {
    await expect(link).toHaveAttribute('href', 'https://barbar1sbas.github.io/zacep/')
  }
  await expect(zacep.getByRole('link', { name: /Макеты в Figma/ })).toHaveAttribute('href', 'https://www.figma.com/design/33uZlvdpstuANY0xc0tvUf?node-id=131-2406')
  await expect(zacep.getByRole('link', { name: /Смотреть UI kit/ })).toHaveAttribute('href', 'https://www.figma.com/design/33uZlvdpstuANY0xc0tvUf?node-id=133-2407')
  await expect(zacep.getByRole('link', { name: /Код на GitHub/ })).toHaveAttribute('href', 'https://github.com/BarBar1sBAS/zacep')
  await expect(zacep.getByRole('link', { name: /Журнал проверок/ })).toHaveAttribute('href', 'https://github.com/BarBar1sBAS/zacep/blob/dfffe9e/tests/TDD.md')
  await expect(zacep).toContainText('отправка заявок пока не подключена')
})

test('Зацеп читается в обеих темах и его части появляются при прокрутке', async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('./#zacep')
      if (await page.locator('html').getAttribute('data-theme') !== theme) {
        await page.getByRole('button', { name: theme === 'dark' ? 'Включить тёмную тему' : 'Включить светлую тему' }).click()
      }
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${theme} / ${width}px`).toBeLessThanOrEqual(1)
      const images = page.locator('[data-zacep-asset]')
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded()
        await expect(image).toHaveAttribute('alt', /\S+/)
        await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true)
        await expect.poll(() => image.evaluate(node => node.closest('.reveal')?.getAttribute('data-visible'))).toBe('true')
      }
    }
  }
})

test('ссылки кейса музея ведут на V1 и отдельную V2', async ({ page }) => {
  await page.goto('./')
  const museum = page.locator('[data-museum-case]')
  await expect(museum.getByRole('link', { name: /Открыть V2/ })).toHaveAttribute('href', 'https://barbar1sbas.github.io/skillbox_museum_v2/')
  await expect(museum.getByRole('link', { name: /Код V2/ })).toHaveAttribute('href', 'https://github.com/BarBar1sBAS/skillbox_museum_v2')
  await expect(museum.getByRole('link', { name: /Сравнить с V1/ })).toHaveAttribute('href', 'https://barbar1sbas.github.io/skillbox_museum/')
})
