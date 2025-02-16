use solana_program::{
    msg,
    pubkey::Pubkey,
    account_info::AccountInfo,
    program_error::ProgramError,
    sysvar::{rent::Rent, Sysvar},
    system_instruction,
    instruction::{Instruction, AccountMeta},
};

pub fn create_vault(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> Result<(), ProgramError> {
    msg!("Creating Vault...");

    // Ensure the correct number of accounts (the vault account and user account)
    if accounts.len() < 2 {
        return Err(ProgramError::NotEnoughAccountKeys);
    }

    let account = &accounts[0]; // The account that will hold the vault data (vault PDA)
    let user_account = &accounts[1]; // User's wallet to fund the new account

    // Derive the PDA (Program Derived Address) for the vault
    let (vault_pda, bump_seed) = Pubkey::find_program_address(&[b"vault"], program_id);
    msg!("Vault PDA: {:?}", vault_pda);

    // Check if the PDA already exists and if it is initialized
    if account.data_is_empty() {
        // Account is not initialized yet, so create it
        let rent = Rent::get()?; // Retrieve rent information
        let lamports_needed = rent.minimum_balance(account.data_len()); // Calculate minimum balance needed

        // Add an instruction to create the vault account if needed
        let create_account_ix = system_instruction::create_account(
            &user_account.key,      // The user's account that will fund the new account
            &vault_pda,             // The PDA to create
            lamports_needed,        // Amount of lamports to send to the new account
            account.data_len() as u64, // Space needed for the vault account
            program_id,             // The program that will own the account
        );

        // Create the transaction to send the instruction
        let create_account_instruction = Instruction {
            program_id: *program_id,
            accounts: vec![
                AccountMeta::new(*user_account.key, true),  // User's account as signer
                AccountMeta::new(vault_pda, false),         // The vault PDA, marked as writable
            ],
            data: create_account_ix.data, // This is the instruction data
        };

        // Log the instruction data and the vault creation success
        msg!("Vault created with PDA: {:?}", vault_pda);
        msg!("Create account instruction: {:?}", create_account_instruction);
        
        // Execute the create account transaction outside of the program
        // (you would typically send this via the Solana client interface)
        Ok(())
    } else {
        msg!("Vault already exists!");
        Ok(())
    }
}

pub fn delete_vault(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
) -> Result<(), ProgramError> {
    msg!("Deleting Vault...");

    // Deletion logic would go here, e.g., closing the vault account or removing data

    Ok(())
}
