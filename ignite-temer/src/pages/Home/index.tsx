import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' //Usando * as zod, pois a biblioteca não permite que usamos o import default - que seria apenas import zod from 'zod'

import {differenceInSeconds} from "date-fns"


import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    Separator,
    MinutesAmountInput,
    StartCountdownButton,
    TaskInput ,
    StopCountdownButton

} from "./styled";


import { useEffect, useState } from "react";



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
    interruptedDate?: Date
}

export function Home (){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

     const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    useEffect(()=>{
        let interval:number

        if(activeCycle){
            interval = setInterval(() =>{
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate)
                )
            }, 1000)
        }

        return () =>{
            clearInterval(interval)
        }
    },[activeCycle])

    



                                                   //Tipando o useForm
     const {register, watch, handleSubmit, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }
     })



     function handleCreateNewCycle( data: NewCycleFormData){
        const id = String(new Date().getTime())

        const newCycle: Cycle ={
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()

        }

        setCycles((state) => [ ...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
     }

     function handleInterruptCycle(){
        setCycles(
            cycles.map((cycle)=>{

                if(cycle.id === activeCycleId){
                    return {...cycle, interruptedDate: new Date()}
                }else{
                    return cycle
                }
            }),
        )
        
        setActiveCycleId(null)
     }





     const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
     const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

     const minutesAmount = Math.floor(currentSeconds/60);
     const secondsAmount = currentSeconds % 60

     const minutes = String(minutesAmount).padStart(2, '0')
     const seconds = String(secondsAmount).padStart(2, '0')



     useEffect(()=> {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
     }, [minutes, seconds, activeCycle])


     const task = watch('task')
     const isSubmitDisable = !task


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        placeholder=" Dê um nome para o seu projeto" 
                        list='task-suggestions'
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option  value="Projeto 1"/>
                        <option  value="Projeto 2"/>
                        <option  value="Projeto 3"/>
                        <option  value="Projeto 4"/>
                    </datalist>


                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number"
                         id="minutesAmount" 
                         placeholder="00" 
                         step={5}
                         min={5}
                         max={60}
                         {...register('minutesAmount',{valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                    ) : (
                    <StartCountdownButton disabled={isSubmitDisable} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                 )}
        </form>
    </HomeContainer>
    )
}