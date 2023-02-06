import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod' //Usando * as zod, pois a biblioteca não permite que usamos o import default - que seria apenas import zod from 'zod'


import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    Separator,
    MinutesAmountInput,
    StartCountdownButton,
    TaskInput 

} from "./styled";
import { useState } from "react";


//Definirmos o Schema da do formulario - sempre observar qual o formato das informação, nesse caso um objeto

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefea'),
    minutesAmount: zod
        .number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

//Integrando o form com o typeScript
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


//Obs: o Estado é a unica forma de guardamos informações afim de que, elas reagam ao usuarios

//Criar uma interface Para o stato
interface Cycle{
    id: string,
    task: string,
    minutesAmount: number
}

export function Home (){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)





    



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
            minutesAmount: data.minutesAmount
        }

        setCycles((state) => [ ...state, newCycle])
        setActiveCycleId(id)

        reset()
     }

     const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

     console.log(activeCycle)

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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton type="submit" disabled={isSubmitDisable}>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
        </form>
    </HomeContainer>
    )
}