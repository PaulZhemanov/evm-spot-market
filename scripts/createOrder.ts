
import { ethers, artifacts } from "hardhat";
import { ORDERBOOK_ADDRESS } from "./deploy";
import { BTC_ADDRESS, USDC_ADDRESS } from "./deployTokens";

const BASE_SIZE = 1 * 1e8; // Количество базового актива (например, 1 BTC)
const ORDER_PRICE = 45000 * 1e9; // Цена за единицу базового актива (например, 45000 USDC)

async function main() {
    // Получаем подписывающего
    const [deployer] = await ethers.getSigners();

    // Получаем ABI контракта OrderBook
    const contractArtifact = await artifacts.readArtifact("OrderBook");

    // Создаём экземпляр контракта OrderBook с подписывающим
    const orderBook = new ethers.Contract(ORDERBOOK_ADDRESS, contractArtifact.abi, deployer);

    // Создание экземпляра токена USDC
    const usdcArtifact = await artifacts.readArtifact("Erc20Token");
    const usdc = new ethers.Contract(USDC_ADDRESS, usdcArtifact.abi, deployer);

    // Создаём ордер на покупку или продажу
    await usdc.mint(deployer.address, 45000 * 1e6);
    await usdc.connect(deployer).approve(orderBook.getAddress(), 45000 * 1e6);
    const createOrderTx = await orderBook.openOrder(BTC_ADDRESS, BASE_SIZE, ORDER_PRICE);
    await createOrderTx.wait();

    console.log("Order created successfully");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
