const puppeteer = require('puppeteer');

class Result {
  browser = null;
  page = null;
  exam = null;
  year = null;
  board = null;
  rollNo = null;
  regNo = null;
  url = 'http://www.educationboardresults.gov.bd/index.php';

  initialize = async () => {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
  };

  getResult = async (exam, year, board, rollNo, regNo) => {
    this.exam = exam;
    this.year = year;
    this.board = board;
    this.rollNo = rollNo;
    this.regNo = regNo;

    await this.page.goto(this.url);

    await this.page.select('select[name="exam"]', this.exam);
    await this.page.select('select[name="year"]', this.year);
    await this.page.select('select[name="board"]', this.board);
    await this.page.type('input[name="roll"]', this.rollNo);
    await this.page.type('input[name="reg"]', this.regNo);

    const securitySelector =
      'form > table > tbody > tr > td:nth-child(2) > fieldset > table > tbody > tr:nth-child(7) > td:nth-child(2)';
    const element = await this.page.waitForSelector(securitySelector);
    const value = await element.evaluate((el) => el.textContent);

    const [num1, num2] = value.split('+');
    const total = Number(num1.trim()) + Number(num2.trim());
    await this.page.type('input[name="value_s"]', total.toString());

    const submitBtn = await this.page.$('input[type="submit"]');
    if (submitBtn) submitBtn.click();

    await this.page.waitForNavigation({
      waitUntil: 'networkidle0'
    });

    const pdf = await this.page.pdf({
      format: 'A4',
      printBackground: true
    });
    await this.browser.close();

    return pdf;
  };
}

module.exports = Result;
