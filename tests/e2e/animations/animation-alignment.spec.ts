import { test, expect } from '@playwright/test'

test.describe('Verificação de Alinhamento da Animação', () => {
  test('deve verificar o posicionamento e dimensões do canvas', async ({ page }) => {
    await page.goto('/')

    // Espera o canvas ser renderizado
    const canvas = await page.waitForSelector('canvas')
    expect(canvas).toBeTruthy()

    // Verifica as dimensões do canvas
    const boundingBox = await canvas.boundingBox()
    expect(boundingBox).not.toBeNull()

    if (boundingBox) {
      console.log('Dimensões do canvas:', boundingBox)

      // Verifica se o canvas está centralizado
      const viewport = page.viewportSize()
      expect(viewport).not.toBeNull()

      if (viewport) {
        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        console.log('Centro do canvas:', { x: centerX, y: centerY })
        console.log('Centro da viewport:', {
          x: viewport.width / 2,
          y: viewport.height / 2,
        })

        // Verifica se está aproximadamente centralizado
        expect(Math.abs(centerX - viewport.width / 2)).toBeLessThan(50)
        expect(Math.abs(centerY - viewport.height / 2)).toBeLessThan(50)
      }
    }

    // Tira screenshots em diferentes resoluções
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.screenshot({ path: 'tests/screenshots/animation-1080p.png' })

    await page.setViewportSize({ width: 1280, height: 720 })
    await page.screenshot({ path: 'tests/screenshots/animation-720p.png' })

    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({ path: 'tests/screenshots/animation-mobile.png' })
  })

  test('deve verificar o comportamento da câmera', async ({ page }) => {
    await page.goto('/')

    // Espera o canvas
    const canvas = await page.waitForSelector('canvas')
    expect(canvas).toBeTruthy()

    // Captura estado inicial
    await page.screenshot({ path: 'tests/screenshots/camera-initial.png' })

    // Simula interação para verificar comportamento da câmera
    await page.mouse.move(0, 0) // Move para o canto superior esquerdo
    await page.mouse.down()
    await page.mouse.move(100, 0)
    await page.screenshot({ path: 'tests/screenshots/camera-pan-right.png' })

    await page.mouse.move(0, 100)
    await page.screenshot({ path: 'tests/screenshots/camera-pan-down.png' })
    await page.mouse.up()

    // Verifica zoom
    await page.keyboard.down('Control')
    await page.mouse.wheel(0, -100)
    await page.screenshot({ path: 'tests/screenshots/camera-zoom-in.png' })

    await page.mouse.wheel(0, 100)
    await page.screenshot({ path: 'tests/screenshots/camera-zoom-out.png' })
    await page.keyboard.up('Control')
  })
})
