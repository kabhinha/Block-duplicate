import React, { useEffect, useState } from 'react'
import MachineListing from '../components/MachineListing'
import axios from 'axios';
import { API_BASE } from '../constants/data';
import toast from 'react-hot-toast';

const Machine = () => {
    const [allMachines, setAllMachines] = useState(null);

    const fetchMachines = async () => {
        try{
            const data = await axios(`${API_BASE}/machines`);
            setAllMachines(data);
        }catch(err){
            toast.error(err.response.data.message);
        }
    }

    useEffect(()=>{
        fetchMachines();
    },[allMachines]);


  return (
    <div>
            <div>
                <div><p>Machines</p></div>
                <div><p>If you’re trying to choose between the Ratio Six and the Ratio Eight, we empathize. They’re both beautiful machines that make smooth, rich coffee. But there are differences! And here they are.</p></div>
            </div>
            <div>
                <div>
                    {
                        allMachines.map((index, machine)=> (
                            <MachineListing key={index} {...machine}/>
                        ))
                    }
                </div>
            </div>

    </div>
  )
}

export default Machine;