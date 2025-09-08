import { formatTime, getTimePanel, getUniqueValuesByKey } from './helper';
import { data } from '@/data';

describe('formatTime', () => {
  it('Добавление 0, если секунд < 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Форматирует время меньше 1 минуты', () => {
    expect(formatTime(34)).toBe('0:34');
  });
  it('Обрабатывает время 0 минут 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('возвращает строку с текущим и общим временем, если totalTime задан', () => {
    expect(getTimePanel(10, 20)).toBe('0:10 / 0:20');
  });
  it('возвращает undefined, если totalTime не задан', () => {
    expect(getTimePanel(10, undefined)).toBeUndefined();
  });

  it('возвращает undefined, если totalTime равен 0', () => {
    expect(getTimePanel(10, 0)).toBeUndefined();
  });
});

describe('getUniqueValuesByKey', () => {
  it('возвращает уникальные строки по ключу, если значение строка', () => {
    const result = getUniqueValuesByKey(data, 'author');
    expect(result.sort()).toEqual(
      [
        '',
        '-',
        'Alexander Nakarada',
        'Frank Schroter',
        'Kevin Macleod',
        'Mixkit',
        'Waltz Piano',
        'Winniethemoog',
      ].sort(),
    );
  });

  it('возвращает уникальные строки из массива по ключу', () => {
    const result = getUniqueValuesByKey(data, 'genre');
    expect(result.sort()).toEqual(['Классическая музыка'].sort());
  });

  it('игнорирует undefined и пустые значения', () => {
    const result = getUniqueValuesByKey(data, 'author');
    expect(result).toEqual([
      'Alexander Nakarada',
      'Frank Schroter',
      'Kevin Macleod',
      'Mixkit',
      '-',
      'Waltz Piano',
      'Winniethemoog',
      '',
    ]);
  });
});
