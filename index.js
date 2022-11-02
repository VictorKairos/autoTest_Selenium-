const {Builder, By, Key, until} = require('selenium-webdriver');
const webshot = require("node-webshot");
 
async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
// Navigate to Url
        await driver.get('https://www.google.com');
 
        await driver.findElement(By.id('L2AGLb')).click();
        await driver.findElement(By.name('q')).sendKeys('automatizacion', Key.ENTER);
 
        let firstResult = await driver.wait(until.elementLocated(By.partialLinkText('wiki')), 3000).click();

        let webAut = await driver.getCurrentUrl();

        // Algunas constantes explicativas
        const SITIO_WEB = webAut,
            NOMBRE_IMAGEN_SALIDA = "webAut.png";
        
        // Opciones para tomar captura
        const OPCIONES = {
            customHeaders: {
                'Accept-Language': 'es_LA', // Lenguaje de la página
            },
            shotSize: { width: 'all', height: 'all' },
            screenSize: { width: 1024, height: 760, },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
        };
        
        const cuandoSeTomeCaptura = err => {
            // Puede que haya un error
            if (err) {
                console.log("Ocurrió un error: ", err);
            } else {
                console.log(`La página ${SITIO_WEB} ha sido guardada en ${NOMBRE_IMAGEN_SALIDA}`);
            }
        };

        webshot(SITIO_WEB, NOMBRE_IMAGEN_SALIDA, OPCIONES, cuandoSeTomeCaptura);
    }
    finally{
        driver.quit();
    }
}

example();