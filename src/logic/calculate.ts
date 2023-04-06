import * as math from 'mathjs'

interface Props {
  firstValue: string
  equation: string
  operation: React.MutableRefObject<string>
}

export const calculate = ({ firstValue, equation, operation }: Props): string => {
  let result = ''
  try {
    switch (operation.current) {
      case '+':
        result = math.add(math.bignumber(firstValue), math.bignumber(Number(equation))).toString()
        break
      case '-':
        result = math.subtract(math.bignumber(firstValue), math.bignumber(Number(equation))).toString()
        break
      case '*':
        result = Number(math.multiply(math.bignumber(firstValue), math.bignumber(Number(equation)))).toString()
        break
      case '/':
        result = Number(math.divide(math.bignumber(firstValue), math.bignumber(Number(equation)))).toString()
        break
      default:
        return ('SYNTAX ERROR')
    }

    return (result !== 'NaN' ? result : 'SYNTAX ERROR')
  } catch (error) {
    return ('SYNTAX ERROR')
  }
}
