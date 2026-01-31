const { test, expect } = require('@playwright/test');


const positiveScenarios = [
    // -------- Functional Positive (24) --------
    { id: 'Pos_Fun_0001', input: 'api paasal yanavaa.', type: 'functional' },
    { id: 'Pos_Fun_0002', input: 'oyaa hari, ehenam api yamu.', type: 'functional' },
    { id: 'Pos_Fun_0003', input: 'vaessa unath api yanna epaeyi.', type: 'functional' },
    { id: 'Pos_Fun_0004', input: 'meeka hariyata vaeda karanavaadha?', type: 'functional' },
    { id: 'Pos_Fun_0005', input: 'vahaama methanata enna.', type: 'functional' },
    { id: 'Pos_Fun_0006', input: 'api heta ennee naehae.', type: 'functional' },
    { id: 'Pos_Fun_0007', input: 'suba udhaeesanak!', type: 'functional' },
    { id: 'Pos_Fun_0008', input: 'karuNaakaralaa eka poddak balanna.', type: 'functional' },
    { id: 'Pos_Fun_0009', input: 'eeyi, ooka dhiyan.', type: 'functional' },
    { id: 'Pos_Fun_0010', input: 'mage phone eka WiFi ekata connect vuna.', type: 'functional' },
    { id: 'Pos_Fun_0011', input: 'tika tika katha karamu.', type: 'functional' },
    { id: 'Pos_Fun_0012', input: 'mama iiyee gedhara giyaa.', type: 'functional' },
    { id: 'Pos_Fun_0013', input: 'api iiLaGa sathiyee hamuvemu.', type: 'functional' },
    { id: 'Pos_Fun_0014', input: 'adha 2025/01/20 nisa rs. 500 k dhenna.', type: 'functional' },
    { id: 'Pos_Fun_0015', input: 'mage laptop eka WiFi ekata connect nae.', type: 'functional' },
    { id: 'Pos_Fun_0016', input: 'mama ada university giya nisaa late vuna.', type: 'functional' },
    { id: 'Pos_Fun_0017', input: 'lankaavee parisaraya bohoma sundara.', type: 'functional' },
    { id: 'Pos_Fun_0018', input: 'mata rs. 5000 k dhenna.', type: 'functional' },
    { id: 'Pos_Fun_0019', input: '2025/12/25 venidhaa nivaadu.', type: 'functional' },
    { id: 'Pos_Fun_0020', input: 'api 7.30 AM venakota emu.', type: 'functional' },
    { id: 'Pos_Fun_0021', input: 'kg 50 k barayi.', type: 'functional' },
    { id: 'Pos_Fun_0022', input: 'ela machan! supiri!!', type: 'functional' },
    { id: 'Pos_Fun_0023', input: 'adha udhee traffic nisaa late.', type: 'functional' },
    { id: 'Pos_Fun_0024', input: 'puLuvannam mata eeka evanna.', type: 'functional' },

    // -------- UI Positive (1) --------
    { id: 'Pos_UI_0001', input: 'Testing', type: 'ui' }
];


const negativeScenarios = [
    { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa.' },
    { id: 'Neg_Fun_0002', input: 'mma gdhara ynwa' },
    { id: 'Neg_Fun_0003', input: 'mama yaluwagegedhara gihin yanava.' },
    { id: 'Neg_Fun_0004', input: 'ada $ supiri ### elakiri !!!' },
    { id: 'Neg_Fun_0005', input: 'o  ya  ta kohomadha' },
    { id: 'Neg_Fun_0006', input: 'mke gr8 vdk machan' },
    { id: 'Neg_Fun_0007', input: 'mama gedhara yanawa' },
    { id: 'Neg_Fun_0008', input: 'photosynthesis kriyaawaliya' },
    { id: 'Neg_Fun_0009', input: 'mAmA GeDhArA yAnAvAa' },
    { id: 'Neg_Fun_0010', input: 'mama campus gihin igena gena hoda rassawak' }
];


test.describe('SwiftTranslator – Functional & UI Validation', () => {

    test.setTimeout(180000);

    /* ---------------- POSITIVE (25 PASS) ---------------- */
    positiveScenarios.forEach(data => {
        test(`PASS | ${data.id}`, async ({ page }) => {

            await page.goto('https://www.swifttranslator.com/', {
                waitUntil: 'domcontentloaded'
            });

            const inputField = page.locator('textarea').first();
            const outputField = page.locator('textarea').last();

            await inputField.waitFor({ state: 'visible' });

            // -------- UI Scenario --------
            if (data.type === 'ui') {
                await inputField.fill(data.input);
                await page.waitForTimeout(2000);
                await inputField.fill('');
                await page.waitForTimeout(2000);

                const output = await outputField.inputValue();
                console.log(`[${data.id}] Output after clear: "${output}"`);

                // UI must clear instantly → PASS
                expect(output).toBe('');
            }

            // -------- Functional Scenario --------
            if (data.type === 'functional') {
                await inputField.pressSequentially(data.input, { delay: 15 });
                await page.waitForTimeout(4000);

                const output = await outputField.inputValue();
                console.log(`[${data.id}] Output:\n${output}`);

                // Functional positive must produce output
                expect(output.trim().length).toBeGreaterThan(0);
            }
        });
    });

    /* ---------------- NEGATIVE (10 FAIL) ---------------- */
    negativeScenarios.forEach(data => {
        test(`FAIL | ${data.id}`, async ({ page }) => {

            await page.goto('https://www.swifttranslator.com/', {
                waitUntil: 'domcontentloaded'
            });

            const inputField = page.locator('textarea').first();
            const outputField = page.locator('textarea').last();

            await inputField.waitFor({ state: 'visible' });
            await inputField.pressSequentially(data.input, { delay: 15 });

            await page.waitForTimeout(4000);

            const output = await outputField.inputValue();
            console.log(`[${data.id}] Output:\n${output}`);

            // Negative → must FAIL (no valid output)
            expect(output.trim()).toBe('');
        });
    });
});
