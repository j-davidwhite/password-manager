use borsh::{BorshDeserialize, BorshSerialize}; 

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Vault {
    pub website: String,
    pub accounts: Vec<AccountData>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct AccountData {
    pub username: String,
    pub password: String,
}
