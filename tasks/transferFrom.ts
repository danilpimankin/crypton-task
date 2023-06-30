import { task } from 'hardhat/config'
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task('transferFrom', 'Transfer tokens to the address from another address')
    .addParam('token', 'Token address')
    .addParam('from', 'Sender address')
    .addParam('to', 'Resiver address')
    .addParam('amount', 'Token amount')
	.setAction(async ({ token, from, to, amount}, { ethers }) => {
        const Token = await ethers.getContractFactory('MyToken')
        const tokenContract = Token.attach(token)
        try
        { 
            const contractTx: ContractTransaction = await tokenContract.transferFrom(from, to, amount);
            const contractReceipt: ContractReceipt = await contractTx.wait();
            const event = contractReceipt.events?.find(event => event.event === 'Transfer');
            const eInitiator: Address = event?.args!['from'];
            const eRecipient: Address = event?.args!['to'];
            const eAmount: BigNumber = event?.args!['value'];            
            console.log(`Initiator: ${eInitiator}`)
            console.log(`Recipient: ${eRecipient}`)
            console.log(`Amount: ${eAmount}`)
        }

        catch(error: any) {
         console.log(error.error);
        }
    })