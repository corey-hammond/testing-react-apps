// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
// import {render, act} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

// function TestComponent() {
//   const {count, increment, decrement} = useCounter()
//   return (
//     <div>
//       <div>Current count: {count}</div>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={increment}>Increment</button>
//     </div>
//   )
// }

// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent(props) {
//     result.current = useCounter(props)
//     return null
//   }
//   render(<TestComponent {...initialProps} />)
//   return result
// }

test('exposes the count and increment/decrement functions', () => {
  // const result = setup()
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 3},
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
