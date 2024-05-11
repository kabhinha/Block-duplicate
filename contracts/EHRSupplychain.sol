// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./HealthRecordSystem.sol";

contract EHRSupplychain is HealthRecordSystem {
    function linkHealthRecordToMedication(address patient, uint256 medicationInstanceID, string memory _data, address manAdd, uint batchID) public {
        require(patients[patient].exists, "Patient does not exist");
        require(medicalRecords[patient][medicationInstanceID].exists, "Medication instance does not exist");
        require(batchID < batches[manAdd].length, "Batch does not exist");
        updateHealthRecord(patient, _data, medicationInstanceID);
    }
    
     
    function verifyMedicationOrigin(uint256 medicationInstanceID, address patientadd) public view returns (bool) {
        require(medicalRecords[patientadd][medicationInstanceID].exists, "Medication instance does not exist");
        if(medicationInstanceID < medicalRecords[patientadd].length) {
            return true;
        } else {
            return false;
        }
    }
    
    function updateHealthRecord(address patient, string memory _data, uint256 medicationInstanceID) public {
        super.updateMedicalRecord(patient, _data, medicationInstanceID);
    }
}
