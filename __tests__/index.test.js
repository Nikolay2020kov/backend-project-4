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
let Data;
let img;

nock.disableNetConnect();

beforeAll(async () => {
  Data = await fsp.readFile(
    path.join(
      getFixturePath('ru-hexlet-io-courses_files'),
      'ru-hexlet-io-courses.html',
    ),
    'utf-8',
  );
  data = await fsp.readFile(
    path.join(getFixturePath('ru-hexlet-io-courses.html')),
    'utf-8',
  );
  img = await fsp.readFile(
    path.join(
      getFixturePath('ru-hexlet-io-courses_files'),
      'ru-hexlet-io-assets-professions-nodeJs.png',
    ),
    'utf-8',
  );
});

afterAll(async () => {
  await fsp.unlink(path.join(a, 'ru-hexlet-io-courses.html'));
  await fsp.rm(path.join(a, 'ru-hexlet-io-courses_files'), {
    recursive: true,
    force: true,
  });
});
describe('Positive download', () => {
  test('Download page', async () => {
    nock(/ru\.hexlet\.io/)
      .get(/\/courses/)
      .reply(200, Data)
      .get(/\/assets\/professions\/nodeJs\.png/)
      .reply(200, img);
    await pageLoader('https://ru.hexlet.io/courses', tmpFilePath);
    const expectedImg = await fsp.readFile(
      path.join(
        a,
        'ru-hexlet-io-courses_files',
        'ru-hexlet-io-assets-professions-nodeJs.png',
      ),
      'utf-8',
    );
    const expectedChangeData = await fsp.readFile(
      path.join(a, 'ru-hexlet-io-courses.html'),
      'utf-8',
    );
    await expect(expectedChangeData).not.toEqual(data);
    await expect(expectedChangeData).toEqual(Data);
    await expect(expectedImg).toEqual(img);
  });
});
