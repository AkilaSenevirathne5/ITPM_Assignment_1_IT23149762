const { test, expect } = require('@playwright/test');

const scenarios = [
    // Renumbered to start from 0004 to follow assignment rules
    { id: 'Pos_Fun_0001', input: 'api paasal yanavaa.' },
    { id: 'Pos_Fun_0002', input: 'oyaa hari, ehenam api yamu.' },
    { id: 'Pos_Fun_0003', input: 'vaessa unath api yanna epaeyi.' },
    { id: 'Pos_Fun_0004', input: 'meeka hariyata vaeda karanavaadha?' },
    { id: 'Pos_Fun_0005', input: 'vahaama methanata enna.' },
    { id: 'Pos_Fun_0006', input: 'api heta ennee naehae.' },
    { id: 'Pos_Fun_0007', input: 'suba udhaeesanak!' },
    { id: 'Pos_Fun_0008', input: 'karuNaakaralaa eka poddak balanna.' },
    { id: 'Pos_Fun_0009', input: 'eeyi, ooka dhiyan.' },
    { id: 'Pos_Fun_0010', input: 'mage phone eka WiFi ekata connect vuna.' },
    { id: 'Pos_Fun_0011', input: 'tika tika katha karamu.' },
    { id: 'Pos_Fun_0012', input: 'mama iiyee gedhara giyaa.' },
    { id: 'Pos_Fun_0013', input: 'api iiLaGa sathiyee hamuvemu.' },
    { id: 'Pos_Fun_0014', input: 'adha 2025/01/20 nisa rs. 500 k dhenna.' },
    { id: 'Pos_Fun_0015', input: 'mage laptop eka WiFi ekata connect nae.' },
    { id: 'Pos_Fun_0016', input: 'mama ada university giya nisaa mage assignment eka karanna late vunaa, eeth heta wenakota eeka iwara karanna puLuwan veyi kiyala hithanawa.' },
    { id: 'Pos_Fun_0017', input: 'lankaavee parisaraya bohoma sundara nisaa vishala sanscharaka pirisak lankaavata hamadhama enava. api me rata raka ganna oonea nisaa parisaraya pahasuven dushnaya karanna honda naehae. eevageema api heta udee 10.00 am venakota colombo gihin meeting ekata join venna hithan inne. oyaalath enavadha kiyala mata vahaama kiyanna.' },
    { id: 'Pos_Fun_0018', input: 'mata rs. 5000 k dhenna.' },
    { id: 'Pos_Fun_0019', input: '2025/12/25 venidhaa nivaadu.' },
    { id: 'Pos_Fun_0020', input: 'api 7.30 AM venakota emu. ' },
    { id: 'Pos_Fun_0021', input: 'kg 50 k barayi.' },
    { id: 'Pos_Fun_0022', input: 'ela machan! supiri!!' },
    { id: 'Pos_Fun_0023', input: 'adha udhee office eke traffic nisaa nimaali late vennee.' },
    { id: 'Pos_Fun_0024', input: 'puLuvannam mata eeka evanna.' },

    // Negative cases
    { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa.' },
    { id: 'Neg_Fun_0002', input: 'mma gdhara ynwa' },
    { id: 'Neg_Fun_0003', input: 'mama yaluwagegedhara gihin yanava.' },
    { id: 'Neg_Fun_0004', input: 'ada $ supiri ### elakiri !!!' },
    { id: 'Neg_Fun_0005', input: 'o  ya  ta kohomadha' },
    { id: 'Neg_Fun_0006', input: 'mke gr8 vdk machan' },
    { id: 'Neg_Fun_0007', input: 'mama gedhara yanawa' },
    { id: 'Neg_Fun_0008', input: 'photosynthesis kriyaawaliya' },
    { id: 'Neg_Fun_0009', input: 'mAmA GeDhArA yAnAvAa' },
    { id: 'Neg_Fun_0010', input: 'mama campus gihin igena gena hoda rassawak karalaa hodin jiwath wenawa' },
];

test.describe('SwiftTranslator Automation', () => {

    test.setTimeout(180000); // 3 minutes total timeout

    for (const data of scenarios) {
        test(`Test Case ${data.id}`, async ({ page }) => {
            // FIX 1: Use domcontentloaded to avoid waiting for slow ads
            await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

            const inputField = page.locator('textarea').first();
            await inputField.waitFor({ state: 'visible' });
            
            // FIX 2: Use pressSequentially instead of fill to trigger Sinhala conversion
            await inputField.pressSequentially(data.input, { delay: 15 });

            // Wait for conversion
            await page.waitForTimeout(4000); 
            
            const outputField = page.locator('textarea').last();
            const actualOutput = await outputField.inputValue();

            console.log(`\n-----------------------------------`);
            console.log(`TC ID: ${data.id}`);
            console.log(`RESULT: ${actualOutput}`);
            console.log(`-----------------------------------`);
            
            expect(actualOutput.length).toBeGreaterThan(0);
        });
    }

    // FIX 3: Renamed to Pos_UI_0002 to avoid sample overlap
    test('Pos_UI_0001: Output clears when input is deleted', async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
        const inputField = page.locator('textarea').first();
        const outputField = page.locator('textarea').last();
        
        await inputField.fill('Testing Update');
        await page.waitForTimeout(2000);
        await inputField.fill('');
        await page.waitForTimeout(2000);
        
        const output = await outputField.inputValue();
        expect(output).toBe('');
    });
});