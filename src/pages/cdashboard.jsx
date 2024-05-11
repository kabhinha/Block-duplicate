import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PharmaChainContract from '../build/contracts/PharmaChain.json';




const Dashboard = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [productSpecID, setProductSpecID] = useState('');
  const [acctAddress, setacctAddress] = useState('');
  const [lic, setlic] = useState('');
  const [org, setorg] = useState('');
  const [Role, setRole] = useState(0);
  const [batchID, setBatchID] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [medicationInstanceID, setMedicationInstanceID] = useState('');
  const [patient, setPatient] = useState('');
  const [expiryDate, setExpiryDate] = useState(0);
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [medicationInstances, setMedicationInstances] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = new Web3('http://localhost:8545' || window.web3.currentProvider);
        setWeb3(web3);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PharmaChainContract.networks[networkId];
        const contract = new web3.eth.Contract(
          PharmaChainContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        console.log(contract.methods)
        setContract(contract);
        
        // Load existing stakeHolders data
        const stakeHolderCount = Number(await contract.methods.stakeHolderCount().call());
        const stakeholders = [];
        const batches = {};
        for (let i = 0; i < stakeHolderCount; i++) {
          const stakeholder = (await contract.methods.getStakeHolder(i).call());
          stakeholders.push(stakeholder);
          console.log(stakeholder);
          let batchCount =  stakeholder.totalBatch;
          if(stakeholder.role == 0)
          {  
            batches[stakeholder.acctAdd] = [];
            for (let j = 0; j < batchCount; j++) {
              const batch = await contract.methods.batches(batches[stakeholder.acctAdd], j);
              batches[stakeholder.acctAdd].push(batch);
              console.log(stakeholder, "Batch:", );
            }
          }
        }
        setProducts(stakeholders);
      } catch (error) {
        console.error('Error connecting to blockchain: ', error);
      }
    };

    initWeb3();
  }, []);
  const addParticipant = async () => {
    try {
      await contract.methods.addParticipant(acctAddress, Role, lic, org).send({ from: acctAddress });
      // Reload product data after adding...
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const addBatch = async () => {
    try {
      await contract.methods.addBatch(batchID, productSpecID, manufacturer).send({ from: acctAddress });
      // Reload batch data after adding...
    } catch (error) {
      console.error('Error adding batch: ', error);
    }
  };

  const dispenseMedication = async () => {
    try {
      await contract.methods.dispenseMedication(medicationInstanceID, batchID, patient, expiryDate).send({ from: acctAddress });
      // Reload medication instance data after dispensing...
    } catch (error) {
      console.error('Error dispensing medication: ', error);
    }
  };

  return (
<div className='container'>
  <div className='p-2 mx-auto' style={{ maxWidth: '600px' }}>
    <h1 className='text-center'>Pharmaceutical Supply Chain Dashboard</h1>

    <div className="mb-4">
      <h2>Products</h2>
      <ul className="list-unstyled">
        {products.map((product, index) => (
          <li key={index}>{product.productSpecID} - {product.productName}</li>
        ))}
      </ul>
    </div>

    <div className="mb-4">
      <h2>Batches</h2>
      <ul className="list-unstyled">
        {batches.map((batch, index) => (
          <li key={index}>{batch.batchID} - {batch.manufacturer}</li>
        ))}
      </ul>
    </div>

    <div className="mb-4">
      <h2>Add Product</h2>
      <form>
        <input type="text" className="form-control mb-2" placeholder="Eth. Account" value={acctAddress} onChange={e => setacctAddress(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Manufacturer license" value={lic} onChange={e => setlic(e.target.value)} />
        <input type="text" className="form-control mb-2 ml-4" placeholder="Organisaztion Name" value={org} onChange={e => setorg(e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Role" value={Role} onChange={e => setRole(e.target.value)} />
        <button className="btn btn-primary btn-block" onClick={addParticipant}>Add Product</button>
      </form>
    </div>

    <div className="mb-4">
      <h2>Add Batch</h2>
      <form>
        <input type="text" className="form-control mb-2" placeholder="Batch ID" value={batchID} onChange={e => setBatchID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Product Spec ID" value={productSpecID} onChange={e => setProductSpecID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
        <button className="btn btn-primary btn-block" onClick={addBatch}>Add Batch</button>
      </form>
    </div>

    <div className="mb-4">
      <h2>Dispense Medication</h2>
      <form>
        <input type="text" className="form-control mb-2" placeholder="Medication Instance ID" value={medicationInstanceID} onChange={e => setMedicationInstanceID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Batch ID" value={batchID} onChange={e => setBatchID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Patient" value={patient} onChange={e => setPatient(e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Expiry Date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
        <button className="btn btn-primary btn-block" onClick={dispenseMedication}>Dispense Medication</button>
      </form>
    </div>
  </div>
</div>
  )
};


export default Dashboard;
