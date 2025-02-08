pub mod instructions;
pub mod processor;
pub mod state;

use solana_program::{
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    account_info::AccountInfo,
};

#[cfg(not(feature = "no-entrypoint"))]
entrypoint!(process_instruction);

// Program entry point.
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    match instructions::Instruction::decode(instruction_data)? {
        instructions::Instruction::CreateVault => {
            processor::create_vault(program_id, accounts)
        }
        instructions::Instruction::DeleteVault => {
            processor::delete_vault(program_id, accounts)
        }
    }
}
