"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

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

// Price chart data (mock)
const priceData = [
  { time: "9:00", price: 3100 },
  { time: "10:00", price: 3150 },
  { time: "11:00", price: 3120 },
  { time: "12:00", price: 3200 },
  { time: "13:00", price: 3180 },
  { time: "14:00", price: 3220 },
  { time: "15:00", price: 3240 },
  { time: "16:00", price: 3245 },
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
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors ${
                      selectedAsset === asset.symbol ? "bg-[#2A2A2A]" : ""
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
                  <div className\
