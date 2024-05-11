import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import EHRSupplyChainContract from '../build/contracts/EHRSupplychain.json';

const ItemListing = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [products, setProducts] = useState([]);
  const [OwnerHistory, setOwnerHistory] = useState([]);
  // Change setacctAddress to setAcctAddress
const [acctAddress, setAcctAddress] = useState('');

  const [lic, setlic] = useState('');
  const [org, setorg] = useState('');
  const [Role, setRole] = useState(0);
  const [batchID, setBatchID] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [medicationInstanceID, setMedicationInstanceID] = useState('');
  const [patient, setPatient] = useState('');
  const [expiryDate, setExpiryDate] = useState(0);
  const [medicationInstances, setMedicationInstances] = useState([]);
  


  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = new Web3(window.web3.currentProvider || 'http://localhost:8545');
        setWeb3(web3);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = EHRSupplyChainContract.networks[networkId];
        const contract = new web3.eth.Contract(
          EHRSupplyChainContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contract);
        console.log(contract.methods)
          // StakeHolders and batches
        const stakeHolderCount = Number(await contract.methods.stakeHolderCount().call());
        const stakeholders = [];
        for (let i = 0; i < stakeHolderCount; i++) {
          const stakeholder = (await contract.methods.getStakeHolder(i).call());
          stakeholders.push(stakeholder);
          console.log(stakeholder);
        }
        setProducts(stakeholders);
        // Get Owner History


      } catch (error) {
        console.error('Error connecting to blockchain: ', error);
      }
    };

    initWeb3();
  }, []);


  // 
  const getBatches = async () => {
    try {
      // Call the contract method to get the batch using the provided parameters
      const response = await contract.methods.getBatches(manufacturer, batchID).call({ from: acctAddress });
      
      // Update the state with the fetched batch information
      setBatch(response);
  
    } catch (error) {
      console.error('Error fetching batch: ', error);
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

    {/* <div className="mb-4">
      <h2>batches</h2>
      <ul className="list-unstyled">
        {batches.map((batch, index) => (
          <li key={index}>{batch.batchID} - {batch.manufacturer}</li>
        ))}
      </ul>
    </div> */}

    <div className="mb-4">
      <h2>Get Owner History</h2>
      <form>
      <input 
  type="text" 
  className="form-control mb-2" 
  placeholder="Eth. Account" 
  value={acctAddress} 
  onChange={e => setAcctAddress(e.target.value)} 
/>

        {/* <input type="text" className="form-control mb-2" placeholder="Eth. Account" value={batchID} onChange={e => setacctAddress(e.target.value)} /> */}
        {/* <input type="text" className="form-control mb-2" placeholder="Manufacturer license" value={lic} onChange={e => setlic(e.target.value)} />
        <input type="text" className="form-control mb-2 ml-4" placeholder="Organisaztion Name" value={org} onChange={e => setorg(e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Role" value={Role} onChange={e => setRole(e.target.value)} /> */}
        <button className="btn btn-primary btn-block" onClick={getBatches}>Add Product</button>
      </form>
    </div>

    {/* <div className="mb-4">
      <h2>Add Batch</h2>
      <form>
        <input type="text" className="form-control mb-2" placeholder="Batch ID" value={batchID} onChange={e => setBatchID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Product Spec ID" value={productSpecID} onChange={e => setProductSpecID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
        <button className="btn btn-primary btn-block" onClick={addBatch}>Add Batch</button>
      </form>
    </div> */}

    {/* <div className="mb-4">
      <h2>Dispense Medication</h2>
      <form>
        <input type="text" className="form-control mb-2" placeholder="Medication Instance ID" value={medicationInstanceID} onChange={e => setMedicationInstanceID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Batch ID" value={batchID} onChange={e => setBatchID(e.target.value)} />
        <input type="text" className="form-control mb-2" placeholder="Patient" value={patient} onChange={e => setPatient(e.target.value)} />
        <input type="number" className="form-control mb-2" placeholder="Expiry Date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
        <button className="btn btn-primary btn-block" onClick={dispenseMedication}>Dispense Medication</button>
      </form>
    </div> */}
  </div>
  <div className='p-4 mx-auto' style={{ maxWidth: '600px' }}>
        <h1 className='text-center mb-4'>Pharmaceutical Supply Chain Dashboard</h1>

        <h2 className='text-center mb-4'>Stakeholders Information</h2>

        <ul className='list-unstyled'>
          <li className='mb-2'>Lic No.:
            {products.map((value, index) => (
              <span key={index}>{value.licNo}</span>
            ))}
          </li>
          <li className='mb-2'>Org Name:
            {products.map((value, index) => (
              <span key={index}>{value.orgName}</span>
            ))}
          </li>
          <li className='mb-2'>Total Batch:
            {products.map((value, index) => (
              <span key={index}>{value.totalBatch}</span>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export { ItemListing };
