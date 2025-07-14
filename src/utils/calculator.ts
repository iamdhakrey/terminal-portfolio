// Safe calculator utility without eval
export class SafeCalculator {
  private static isNumber(value: string): boolean {
    return !isNaN(Number(value)) && isFinite(Number(value));
  }

  private static tokenize(expression: string): string[] {
    // Remove spaces and split by operators, preserving the operators
    return expression
      .replace(/\s+/g, '')
      .split(/([+\-*/()%])/)
      .filter(token => token.length > 0);
  }

  private static isOperator(token: string): boolean {
    return ['+', '-', '*', '/', '%'].includes(token);
  }

  private static getPrecedence(operator: string): number {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
      case '%':
        return 2;
      default:
        return 0;
    }
  }

  private static applyOperation(operator: string, b: number, a: number): number {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      case '%':
        if (b === 0) throw new Error('Division by zero');
        return a % b;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }

  static calculate(expression: string): number {
    const tokens = this.tokenize(expression);
    const values: number[] = [];
    const operators: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (this.isNumber(token)) {
        values.push(Number(token));
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          const operator = operators.pop()!;
          const b = values.pop()!;
          const a = values.pop()!;
          values.push(this.applyOperation(operator, b, a));
        }
        operators.pop(); // Remove the '('
      } else if (this.isOperator(token)) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== '(' &&
          this.getPrecedence(operators[operators.length - 1]) >= this.getPrecedence(token)
        ) {
          const operator = operators.pop()!;
          const b = values.pop()!;
          const a = values.pop()!;
          values.push(this.applyOperation(operator, b, a));
        }
        operators.push(token);
      } else {
        throw new Error(`Invalid token: ${token}`);
      }
    }

    while (operators.length > 0) {
      const operator = operators.pop()!;
      const b = values.pop()!;
      const a = values.pop()!;
      values.push(this.applyOperation(operator, b, a));
    }

    if (values.length !== 1) {
      throw new Error('Invalid expression');
    }

    return values[0];
  }

  static isValidExpression(expression: string): boolean {
    // Check for valid characters only
    return /^[0-9+\-*/.()% ]+$/.test(expression);
  }
}
