import { stringifyAstToSql } from './helpers/stringifyAstToSql';

describe('bin operator node to sql', () => {
  test('plus', () => {
    const code = '1 + 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 + 1');
  });

  test('minus', () => {
    const code = '1 - 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 - 1');
  });

  test('multiply', () => {
    const code = '1 * 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 * 1');
  });

  test('division', () => {
    const code = '1 / 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 / 1');
  });

  test('remainder', () => {
    const code = '1 % 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 % 1');
  });

  test('power', () => {
    const code = '1 ^ 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 ^ 1');
  });

  test('equal', () => {
    const code = '1 == 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 = 1');
  });

  test('equal can work with different types', () => {
    const code = '1 == ""';
    const result = stringifyAstToSql(code);

    expect(result).toBe("1 = ''");
  });

  test('not equal', () => {
    const code = '1 != 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 != 1');
  });

  test('not equal can work with different types', () => {
    const code = '1 != ""';
    const result = stringifyAstToSql(code);

    expect(result).toBe("1 != ''");
  });

  test('greater', () => {
    const code = '1 > 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 > 1');
  });

  test('greater or equal', () => {
    const code = '1 >= 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 >= 1');
  });

  test('less', () => {
    const code = '1 < 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 < 1');
  });

  test('less or equal', () => {
    const code = '1 <= 1';
    const result = stringifyAstToSql(code);

    expect(result).toBe('1 <= 1');
  });

  test('binary operators can work with if', () => {
    const code = 'IF(2 > 1, 1, 0) + IF(2 < 1, 1, 0)';
    const result = stringifyAstToSql(code);

    expect(result).toBe(
      'CASE WHEN 2 > 1 THEN 1 ELSE 0 END + CASE WHEN 2 < 1 THEN 1 ELSE 0 END',
    );
  });

  // test('and', () => {
  //   const code = '1 && 1';
  //   const result = stringifyAstToSql(code);

  //   expect(result).toBe('1 AND 1');
  // });

  // test('or', () => {
  //   const code = '1 || 1';
  //   const result = stringifyAstToSql(code);

  //   expect(result).toBe('1 OR 1');
  // });
});

// describe('bin operator node to js', () => {
//   test('plus', () => {
//     const code = '1 + 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 + 1');
//   });

//   test('minus', () => {
//     const code = '1 - 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 - 1');
//   });

//   test('multiply', () => {
//     const code = '1 * 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 * 1');
//   });

//   test('division', () => {
//     const code = '1 / 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 / 1');
//   });

//   test('remainder', () => {
//     const code = '1 % 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 % 1');
//   });

//   test('power', () => {
//     const code = '1 ^ 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 ^ 1');
//   });

//   test('equal', () => {
//     const code = '1 == 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 = 1');
//   });

//   test('not equal', () => {
//     const code = '1 != 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 != 1');
//   });

//   test('greater', () => {
//     const code = '1 > 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 > 1');
//   });

//   test('greater or equal', () => {
//     const code = '1 >= 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 >= 1');
//   });

//   test('less', () => {
//     const code = '1 < 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 < 1');
//   });

//   test('less or equal', () => {
//     const code = '1 <= 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 <= 1');
//   });

//   test('and', () => {
//     const code = '1 && 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 AND 1');
//   });

//   test('or', () => {
//     const code = '1 || 1';
//     const result = stringifyAstToSql(code);

//     expect(result).toBe('1 OR 1');
//   });
// });

describe('bin operator node errors', () => {
  test('plus can`t work with different types', () => {
    const code = '1 + ""';

    try {
      const result = stringifyAstToSql(code);
      throw new Error('Должна быть ошибка');
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error);

      expect((e as Error).message).toBe(
        'Неожиданный тип данных при + на позиции 4',
      );
    }
  });

  test('plus can`t work with different types', () => {
    const code = '1 + CONCAT(CONCAT(""))';

    try {
      const result = stringifyAstToSql(code);
      throw new Error('Должна быть ошибка');
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error);

      expect((e as Error).message).toBe(
        'Неожиданный тип данных при + на позиции 4',
      );
    }
  });

  test('binary operators can`t work with IfStatementNode if it may returns different types', () => {
    const code = 'IF(2 > 1, "", 0) + 1';

    try {
      const result = stringifyAstToSql(code);
      throw new Error('Должна быть ошибка');
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error);

      expect((e as Error).message).toBe(
        'Неожиданный тип данных при + на позиции 19',
      );
    }
  });
});
