import getLevel from '../levels';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Начинаем тестирование функции "getLevel" ', () => {
  test('Должны вызвать функцию fetchData с переданным ID пользователя', () => {

    fetchData.mockReturnValue({});
    getLevel(15);

    expect(fetchData).toBeCalledWith(`https://server/user/15`)
  });

  test('Должны получить уровень пользователя', () => {
    const response = {
      "status": "ok",
      "level": "25"
    };

    fetchData.mockReturnValue(response);

    expect(getLevel()).toBe(`Ваш текущий уровень: ${response.level}`);
  });

  test('Должны получить отрицательный ответ', () => {
    const response = {};

    fetchData.mockReturnValue({});

    expect(getLevel()).toBe(`Информация об уровне временно недоступна`);
  });
});
