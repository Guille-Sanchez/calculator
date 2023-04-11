import * as math from 'mathjs'

interface Props {
  firstValue: string
  secondValue: string
  operation: string
}

export const calculate = ({ firstValue, secondValue, operation }: Props): string => {
  console.log(firstValue, secondValue, operation)
  let result = ''
  try {
    switch (operation) {
      case '+':
        result = math.add(math.bignumber(firstValue), math.bignumber(Number(secondValue))).toString()
        break
      case '-':
        result = math.subtract(math.bignumber(firstValue), math.bignumber(Number(secondValue))).toString()
        break
      case '*':
        result = Number(math.multiply(math.bignumber(firstValue), math.bignumber(Number(secondValue)))).toString()
        break
      case '/':
        result = Number(math.divide(math.bignumber(firstValue), math.bignumber(Number(secondValue)))).toString()
        break
      default:
        return ('SYNTAX ERROR')
    }

    return (result !== 'NaN' ? result.replace('.', ',') : 'SYNTAX ERROR')
  } catch (error) {
    return ('SYNTAX ERROR')
  }
}
