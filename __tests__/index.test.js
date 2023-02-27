import fs from 'fs';
import os from 'os';
import nock from 'nock';
import { fileURLToPath } from 'url';
import path from 'path';
import pageLoader from '../src/index.js';

const { promises: fsp } = fs;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpFilePath = os.tmpdir();
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const regexps = /^[^a-z_]+/gm;
const a = tmpFilePath.replace(regexps, '');
let data;

nock.disableNetConnect();

beforeAll(async () => {
  data = await fsp.readFile(path.join(getFixturePath('ru-hexlet-io-courses.html')), 'utf-8');
});

afterAll(async () => {
  await fsp.unlink(path.join(a, 'ru-hexlet-io-courses.html'));
  await fsp.rm(a, { recursive: true, force: true });
});

test('Download page', async () => {
  nock(/ru\.hexlet\.io/)
    .get(/\/courses/)
    .reply(200, data);
  await pageLoader('https://ru.hexlet.io/courses', tmpFilePath);
  const expectedData = await fsp.readFile(path.join(a, 'ru-hexlet-io-courses.html'), 'utf-8');
  expect(expectedData).toEqual(data);
});
