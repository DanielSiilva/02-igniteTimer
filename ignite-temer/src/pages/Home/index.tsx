import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' //Usando * as zod, pois a biblioteca não permite que usamos o import default - que seria apenas import zod from 'zod'

import {Countdown} from './components/Countdown/index'
import {NewCycleForm} from './components/NewCycleForm/index'

import {differenceInSeconds} from "date-fns"


import { 
    HomeContainer, 
    StartCountdownButton,
    StopCountdownButton

} from "./styled";


import { createContext, useEffect, useState } from "react";

// O Prop Drilling é um termo utilizado para quando temos propriedades que estão se repassando em diversas camadas da nossa árvore de componentes.

//Definirmos o Schema da do formulario - sempre observar qual o formato das informação, nesse caso um objeto

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefea'),
    minutesAmount: zod
        .number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

//Integrando o form com o typeScript
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


//Obs: o Estado é a unica forma de guardamos informações afim de que, elas reagem as iterações dos  usuarios

//Criar uma interface Para o state
interface Cycle{
    id: string,
    task: string,
    minutesAmount: number, 
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

interface CyclesContextType{
    activeCycle: Cycle | undefined ,
    activeCycleId: string | null,
    markCurrentCycleAsFinished: () => void

}


export const CyclesContext = createContext({} as CyclesContextType)



export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)

  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // const task = watch('task')
  // const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /* disabled={isSubmitDisable} */ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}