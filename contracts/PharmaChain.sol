// SPDX-License-Identifier: MIT
/*
For Pharmaceutical Supply Chain
stakeHolders
- Manufacterer
- Distributer
- Wholeseller
- Retailer (Pharmacist)
- Consumer (Patient)* [to be link with medication txn]
*/
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract PharmaChain {
    enum Roles {
        MANUFACTERER, // add
        DISTRIBUTER, // ownershiptransfer
        WHOLESELLER, // ownershiptransfer
        PHARMCIST, // ownershiptransfer
        PATIENT, // MajorOwner
        DOCTOR, // view+add
        LAB, // add
        RESEARCHER // view
    }

    struct Medicine {
        address manId; // Manufacturer Id
        uint256 BatchId;
        uint256 price;
        uint256 expDate;
        uint256 mfgDate;
        address owner;
        address[] owners; // current and all past owners
    }

    struct StakeHolder {
        address acctAdd;
        Roles role;
        string licNo; // Unique
        string orgName;
        uint256 totalBatch;
    }

    struct Batch {
        uint256 BatchId;
        uint256 Qty;
        uint256 batchId;
    }

    modifier ownSome(address _add, uint256 batchId) {
        for (uint256 i = 0; i < medicines[batchId][0].owners.length; i++) {
            if (medicines[batchId][0].owners[i] == _add) {
                _;
            }
        }
        revert("Batch is not associated with account provided");
        _;
    }

    mapping(uint256 => StakeHolder) public stakeHolders;
    mapping(address => StakeHolder) public stakeholders;
    mapping(address => Batch[]) public batches;
    mapping(uint256 => Medicine[]) public medicines;

    uint256 public stakeHolderCount = 0;
    

    event StakeHolderadded(
        address acctAdd,
        Roles _role,
        string _licNo,
        string _orgName,
        uint256 totalBatch
    );

    event BatchAdded(
        uint256 BathID,
        address byMan
    );

    event medicineAdded(
        address manId,
        uint256 BatchId,
        uint256 price,
        uint256 expDate,
        uint256 mfgDate,
        address owner,
        address[] owners
    );

    event ownershipTransfer(
        address _currentOwner,
        address _newOwner,
        uint256 _batchId
    );

    function addParticipant(
        address _acctAdd,
        Roles _role,
        string memory _licNo,
        string memory _orgName
    ) public {
        StakeHolder memory _participant = StakeHolder(
            _acctAdd,
            _role,
            _licNo,
            _orgName,
            0
        );
        stakeHolders[stakeHolderCount] = _participant;
        stakeholders[_acctAdd] = _participant;

        stakeHolderCount++;
        emit StakeHolderadded(_acctAdd, _role, _licNo, _orgName, 0);
    }

    function bytesToUint(bytes32 b) internal pure returns (uint256){
            uint256 number;
            for(uint i=0;i<b.length;i++){
                number = number + uint(uint8(b[i]))*(2**(8*(b.length-(i+1))));
            }
        return number;
    }

    function addBatch(uint256 _shID, string memory medname) public {
        require(
            stakeHolders[_shID].role == Roles.MANUFACTERER,
            "Only Manufacterer can add Batch"
        );
        bytes32 _BatchId = keccak256(
            abi.encode(stakeHolders[_shID].licNo, " ", medname)
        );
        uint256 _BatchIdd = bytesToUint(_BatchId);
        uint256 _batchId = batches[stakeHolders[_shID].acctAdd].length;
        Batch memory newBatch = Batch({
            BatchId: _BatchIdd,
            Qty: 0,
            batchId: _batchId
        });
        batches[stakeHolders[_shID].acctAdd].push(newBatch);
        stakeHolders[_shID].totalBatch++;
        emit BatchAdded(_BatchIdd, stakeHolders[_shID].acctAdd);
    }

    function addMedicine(
        uint256 _shID,
        uint256 _bId,
        uint256 BatchId,
        uint256 price,
        uint256 _expDate,
        uint256 _mfgDate
    ) public {
        require(
            stakeHolders[_shID].role == Roles.MANUFACTERER,
            "Only Manufacterer can add medicine"
        );
        address[] memory _ownersAssociated = new address[](1);
        _ownersAssociated[0] = stakeHolders[_shID].acctAdd;
        Medicine memory newMedicine = Medicine(
            stakeHolders[_shID].acctAdd,
            BatchId,
            price,
            _expDate,
            _mfgDate,
            stakeHolders[_shID].acctAdd,
            _ownersAssociated
        );
        medicines[batches[stakeHolders[_shID].acctAdd][_bId].BatchId].push(
            newMedicine
        );
        batches[stakeHolders[_shID].acctAdd][_bId].Qty++; 
        emit medicineAdded(
            stakeHolders[_shID].acctAdd,
            BatchId,
            price,
            _expDate,
            _mfgDate,
            stakeHolders[_shID].acctAdd,
            _ownersAssociated
        );
    }

    function ownerTransfer(
        address _currentOwner,
        address _newOwner,
        uint256 _batchId
    ) public ownSome(_currentOwner, _batchId) {
        for (uint256 i = 0; i < medicines[_batchId].length; i++) {
            medicines[_batchId][i].owner = _newOwner;
            medicines[_batchId][i].owners.push(_newOwner);
        }
        emit ownershipTransfer(_currentOwner, _newOwner, _batchId);
    }

    function getStakeHolder(uint256 _id) public view returns(StakeHolder memory) {
        return stakeHolders[_id];
    }

    function getBatches(address _manAdd, uint256 _id) public view returns(Batch memory) {
        return batches[_manAdd][_id];
    }

    function getHistory(uint256 _bid) public view returns (address[] memory) {
        return medicines[_bid][0].owners;
    }

    constructor() public {
        addParticipant(msg.sender, Roles.MANUFACTERER, "Testoo1", "Admin");
        addBatch(0, "Test");
        uint256 dummy = batches[msg.sender][0].BatchId;
        addMedicine(0, 0, dummy, 1, 1, 1);
    }
}
