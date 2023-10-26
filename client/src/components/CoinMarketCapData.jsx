import { useEffect, useState } from "react";

const CoinRanking = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'coinranking3974abc86f3b608df9e6220ee3dafd557dc7793ce4683661',
                        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
                    }
                };
                const response = await fetch('https://api.coinranking.com/v2/coins', options);
                if (response.ok) {
                    const result = await response.json();
                    setCoins(result.data.coins);
                } else {
                    console.error('Error al obtener datos');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const formatMarketCap = (marketCap) => {
        if (marketCap >= 1e12) {
            return (marketCap / 1e12).toFixed(2) + " trillion";
        } else if (marketCap >= 1e9) {
            return (marketCap / 1e9).toFixed(2) + " billion";
        } else if (marketCap >= 1e6) {
            return (marketCap / 1e6).toFixed(2) + " million";
        } else {
            return marketCap.toString();
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Icon</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map((coin) => (
                        <tr key={coin.uuid}>
                            <td>{coin.rank}</td>
                            <td>{coin.symbol}</td>
                            <td>{coin.name}</td>
                            <td>
                                <img
                                    src={coin.iconUrl}
                                    alt={`${coin.name} Icon`}
                                    width="24"
                                    height="24"
                                />
                            </td>
                            <td>${coin.price}</td>
                            <td>{formatMarketCap(coin.marketCap)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CoinRanking