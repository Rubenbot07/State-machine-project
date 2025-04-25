import { useMachine } from "@xstate/react";
import bookingMachine from "../Machines/bookingMachine";
import { Nav } from "../Components/Nav";
import { StepsLayout } from "./StepsLayout";
import './BaseLayout.css';
export const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);
    return (
        <div className='BaseLayout'>
            <Nav state={state} send={send} />
            <StepsLayout state={state} send={send}/>
        </div>
    )
}
