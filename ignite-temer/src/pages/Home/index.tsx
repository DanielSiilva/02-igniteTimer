import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    Separator,
    MinutesAmountInput,
    StartCountdownButton,
    TaskInput 

} from "./styled";


export function Home (){
     const {register, watch, handleSubmit} = useForm()

     function handleCreateNewCycle( data: any){
        console.log(data)
     }

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