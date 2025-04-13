"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import TradingViewTicker from "@/components/TradingViewTicker"
import TradingViewChart from "@/components/TradingViewChart"

// Sample data
const assets = [
  { symbol: "ETH", name: "Ethereum", price: 3245.67, change: 2.4 },
  { symbol: "BTC", name: "Bitcoin", price: 52345.89, change: -1.2 },
  { symbol: "SOL", name: "Solana", price: 145.32, change: 5.7 },
  { symbol: "AVAX", name: "Avalanche", price: 32.45, change: 3.1 },
  { symbol: "MATIC", name: "Polygon", price: 1.23, change: -0.8 },
]

const positions = [
  { asset: "ETH", type: "Long", size: "0.5 ETH", entry: 3120.45, current: 3245.67, pnl: "+4.01%" },
  { asset: "BTC", type: "Short", size: "0.02 BTC", entry: 53000.0, current: 52345.89, pnl: "+1.23%" },
]

const transactions = [
  { id: 1, type: "Buy", asset: "ETH", amount: "0.5 ETH", price: 3120.45, total: "$1,560.23", time: "2h ago" },
  { id: 2, type: "Sell", asset: "BTC", amount: "0.1 BTC", price: 54000.0, total: "$5,400.00", time: "1d ago" },
  { id: 3, type: "Buy", asset: "SOL", amount: "10 SOL", price: 135.67, total: "$1,356.70", time: "3d ago" },
  { id: 4, type: "Sell", asset: "SOL", amount: "10 SOL", price: 145.32, total: "$1,453.20", time: "1h ago" },
]



export default function TradingSimulator() {
  const [selectedAsset, setSelectedAsset] = useState("ETH")
  const [orderType, setOrderType] = useState("market")
  const [tradeType, setTradeType] = useState("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [timeframe, setTimeframe] = useState("1h")

  // Find the selected asset data
  const asset = assets.find(a => a.symbol === selectedAsset) || assets[0]

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Simulator</h1>
          <p className="text-gray-400">Practice trading in a risk-free environment</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Simulator
          </Button>
        </div>
      </div>

      <TradingViewTicker />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Asset List and Order Form */}
        <div className="space-y-6">
          {/* Asset List */}
          <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
            <CardHeader>
              <CardTitle>Assets</CardTitle>
              <CardDescription>Select an asset to trade</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#2A2A2A]">
                {assets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors ${selectedAsset === asset.symbol ? "bg-[#2A2A2A]" : ""
                      }`}
                    onClick={() => setSelectedAsset(asset.symbol)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center mr-3">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-400">{asset.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${asset.price.toLocaleString()}</div>
                      <div className={`text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {asset.change >= 0 ? "+" : ""}{asset.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Chart */}
        <div className="lg:col-span-2 h-[500px]">
          <Card className="bg-[#1E1E1E] border-[#2A2A2A] h-full">
            <CardHeader>
              {/* <CardTitle></CardTitle> */}
            </CardHeader>
            <CardContent className="h-[calc(100%-2rem)]">
              <TradingViewChart />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Form */}
      <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle>Place Order</CardTitle>
          <CardDescription>
            Trading {asset.name} ({asset.symbol})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between rounded-md overflow-hidden">
                <button
                  className={`flex-1 py-2 text-center ${tradeType === "buy" ? "bg-green-500 text-white" : "bg-[#2A2A2A] text-gray-400"}`}
                  onClick={() => setTradeType("buy")}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 py-2 text-center ${tradeType === "sell" ? "bg-red-500 text-white" : "bg-[#2A2A2A] text-gray-400"}`}
                  onClick={() => setTradeType("sell")}
                >
                  Sell
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between rounded-md overflow-hidden">
                <button
                  className={`flex-1 py-2 text-center ${orderType === "market" ? "bg-blue-500 text-white" : "bg-[#2A2A2A] text-gray-400"}`}
                  onClick={() => setOrderType("market")}
                >
                  Market
                </button>
                <button
                  className={`flex-1 py-2 text-center ${orderType === "limit" ? "bg-blue-500 text-white" : "bg-[#2A2A2A] text-gray-400"}`}
                  onClick={() => setOrderType("limit")}
                >
                  Limit
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Amount ({asset.symbol})</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Amount in ${asset.symbol}`}
              />
            </div>

            {orderType === "limit" && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Price (USD)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Limit price in USD"
                />
              </div>
            )}

            <div>
              <p className="text-sm text-gray-400 mb-2">
                Estimated cost: ${amount ? (parseFloat(amount) * asset.price).toFixed(2) : "0.00"}
              </p>
            </div>

            <Button
              className={`w-full ${tradeType === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
            >
              {tradeType === "buy" ? "Buy" : "Sell"} in {asset.symbol}
            </Button>
          </div>
        </CardContent>
      </Card>

  <div className="lg:col-span-2 space-y-6">

    {/* Portfolio & Transactions */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Portfolio */}
      <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
          <CardDescription>Current portfolio value: $5,230.45</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#2A2A2A]">
            {positions.map((position, index) => (
              <div key={index} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{position.asset}</div>
                  <div className={`text-sm font-medium ${position.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {position.pnl}
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div>{position.type} {position.size}</div>
                  <div>Entry: ${position.entry}</div>
                </div>
              </div>
            ))}
            {positions.length === 0 && (
              <div className="p-4 text-center text-gray-400">
                No open positions
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card className="bg-[#1E1E1E] border-[#2A2A2A]">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your trading activity</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#2A2A2A]">
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">
                    <span className={tx.type === "Buy" ? "text-green-500" : "text-red-500"}>
                      {tx.type}
                    </span> {tx.asset}
                  </div>
                  <div className="text-sm text-gray-400">{tx.time}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div>{tx.amount} @ ${tx.price}</div>
                  <div>{tx.total}</div>
                </div>
              </div>
            ))}
          </div>
          {transactions.length > 3 && (
            <div className="p-4">
              <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                View All Transactions
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
      </div>
      </div>
  )
}