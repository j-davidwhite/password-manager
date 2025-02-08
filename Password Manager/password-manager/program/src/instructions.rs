use borsh::{BorshSerialize, BorshDeserialize}; 
use solana_program::program_error::ProgramError;

#[derive(BorshDeserialize, BorshSerialize, Debug)] 
pub enum Instruction {
    CreateVault,
    DeleteVault,
}

impl Instruction {
    pub fn decode(input: &[u8]) -> Result<Instruction, ProgramError> {
        Instruction::try_from_slice(input).map_err(|_| ProgramError::InvalidInstructionData)
    }
}
