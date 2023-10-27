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
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Precios y señales de criptomonedas.
                </div>
                <div className="card-body">
                    <table id="datatablesSimple" className="table">
                        <thead>
                            <tr>
                                <th className="align-middle">Rank</th>
                                <th className="align-middle">Name</th>
                                <th className="align-middle">Price</th>
                                <th className="align-middle">Market Cap</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th className="align-middle">Rank</th>
                                <th className="align-middle">Name</th>
                                <th className="align-middle">Price</th>
                                <th className="align-middle">Market Cap</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {coins.map((coin) => (
                                <tr key={coin.uuid}>
                                    <td className="align-middle">{coin.rank}</td>
                                    <td className="align-middle">
                                        <img
                                            src={coin.iconUrl}
                                            alt={`${coin.name} Icon`}
                                            width="24"
                                            height="24"
                                        />
                                        &nbsp;
                                        <span className="fw-bold">{coin.name}</span>
                                        &nbsp;
                                        <span className="fw-light">{coin.symbol}</span>
                                    </td>
                                    <td className="align-middle">${coin.price}</td>
                                    <td className="align-middle">{formatMarketCap(coin.marketCap)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default CoinRanking;