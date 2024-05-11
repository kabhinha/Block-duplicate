// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./PharmaChain.sol";

contract HealthRecordSystem is PharmaChain {
    struct HealthRecord {
        string data;
        address patientPublicKey;
        address doctorPublicKey;
        bool encrypted;
    }

     struct Patient {
        uint256 patientID;
        string name;
        address medicalHistoryID;
        bool exists;
    }

    struct MedicalRecord {
        address medicalRecordID;
        bool exists;
        string data;
        uint256 hash; // Hash references Patient.medicalHistoryID
    }

    mapping(address => Patient) public patients;
    mapping(address => MedicalRecord[]) public medicalRecords;

    uint256 public patientCount;
    uint256 public medicalRecordCount;

    event PatientAdded(uint256 patientID, string name, address medicalHistoryID);
    event MedicalRecordAdded(address medicalRecordID, string data, uint256 hash);

    function addPatient(string memory _name) public {
        patients[msg.sender] = Patient({
            patientID: patientCount,
            name: _name,
            medicalHistoryID: msg.sender, // Assuming medical history is stored on-chain
            exists: true
        });
        patientCount++;
        emit PatientAdded(patients[msg.sender].patientID, _name, msg.sender);
    }

    function addMedicalRecord(string memory _data, address medicalRecordAdd, address patientAdd) public {
        require(patients[msg.sender].exists, "Patient does not exist");
        require(stakeholders[msg.sender].role == Roles.DOCTOR || stakeholders[msg.sender].role == Roles.LAB || stakeholders[msg.sender].role == Roles.PATIENT, "Only doctor, lab person can add records");
        
        MedicalRecord memory mr = MedicalRecord({
            medicalRecordID: medicalRecordAdd,
            data: _data,
            exists: true,
            hash: uint256(keccak256(abi.encodePacked(patients[msg.sender].medicalHistoryID, _data)))
        });
        if (stakeholders[msg.sender].role == Roles.DOCTOR) {
        medicalRecords[patientAdd][medicalRecordCount] = mr;
        } else {
        medicalRecords[msg.sender][medicalRecordCount] = mr;
        }
        medicalRecordCount++;
        emit MedicalRecordAdded(medicalRecords[msg.sender][medicalRecordCount - 1].medicalRecordID, _data, medicalRecords[msg.sender][medicalRecordCount - 1].hash);
    }
    
    function getPatient(address _patientAddress) public view returns (Patient memory) {
        return patients[_patientAddress];
    } 

    function getMedicalRecord(address _patientAddress) public view returns (MedicalRecord[] memory) {
        require(patients[_patientAddress].exists, "Patient does not exist");
        return medicalRecords[_patientAddress];
    }

    function updateMedicalRecord(address _patientAddress, string memory _data, uint256 _medID) public {
        require(patients[_patientAddress].exists, "Patient does not exist");
        medicalRecords[_patientAddress][_medID].data = _data;
        medicalRecords[_patientAddress][_medID].hash = uint256(keccak256(abi.encodePacked(patients[_patientAddress].medicalHistoryID, _data)));
        emit MedicalRecordAdded(medicalRecords[_patientAddress][_medID].medicalRecordID, _data, medicalRecords[_patientAddress][_medID].hash);
    }
}
