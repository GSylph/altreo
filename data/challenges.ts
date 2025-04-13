import { Content } from '../components/ChallengeContent'

export interface Challenge {
  id: string
  slug: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  modules: number
  image: string
  content: Content[]
  completed: boolean
}

export const challenges: Challenge[] = [
  {
    id: 'defi-basics',
    slug: 'defi-basics',
    title: 'DeFi Basics',
    description: 'Learn the fundamentals of Decentralized Finance and how it\'s changing the financial landscape.',
    difficulty: 'beginner',
    duration: '2 hours',
    modules: 5,
    image: '/challenges/defi-basics.jpg',
    completed: false,
    content: [
      // Module 1: Introduction to DeFi
      {
        type: 'text',
        title: 'Module 1: What is DeFi?',
        content: 'Decentralized Finance (DeFi) is revolutionizing the financial world by creating an open-source, permissionless, and transparent financial service ecosystem. Unlike traditional finance, DeFi operates without central authorities, giving users full control over their assets and financial activities.\n\nIn this module, we\'ll explore the core concepts of DeFi and understand how it differs from traditional finance.'
      },
      {
        type: 'video',
        title: 'Understanding DeFi',
        content: 'dQw4w9WgXcQ'
      },
      {
        type: 'quiz',
        title: 'Check Your Understanding',
        content: [
          {
            question: 'What is the main advantage of DeFi over traditional finance?',
            options: [
              'Faster transaction speeds',
              'Lower fees',
              'No need for intermediaries',
              'Higher returns'
            ],
            correctAnswer: 2
          }
        ]
      },
      // Module 2: Key Components
      {
        type: 'text',
        title: 'Module 2: Key Components of DeFi',
        content: 'DeFi is built on several key components:\n\n• Smart Contracts: Self-executing contracts with terms directly written into code\n\n• Liquidity Pools: Pools of tokens locked in smart contracts\n\n• Automated Market Makers (AMMs): Systems that enable automatic trading\n\n• Yield Farming: Strategies to earn rewards by providing liquidity\n\n• Governance Tokens: Tokens that give voting rights in protocol decisions'
      },
      {
        type: 'code',
        title: 'Simple Smart Contract Example',
        content: {
          language: 'solidity',
          code: 'contract SimpleStorage {\n  uint256 private value;\n\n  function set(uint256 _value) public {\n    value = _value;\n  }\n\n  function get() public view returns (uint256) {\n    return value;\n  }\n}'
        }
      },
      {
        type: 'quiz',
        title: 'Test Your Knowledge',
        content: [
          {
            question: 'Which component allows automatic trading in DeFi?',
            options: [
              'Smart Contracts',
              'Automated Market Makers (AMMs)',
              'Governance Tokens',
              'Yield Farming'
            ],
            correctAnswer: 1
          }
        ]
      },
      // Module 3: DeFi Protocols
      {
        type: 'text',
        title: 'Module 3: Popular DeFi Protocols',
        content: 'Let\'s explore some of the most important DeFi protocols:\n\n• Lending Platforms: Aave, Compound\n\n• Decentralized Exchanges: Uniswap, SushiSwap\n\n• Yield Aggregators: Yearn Finance\n\n• Stablecoin Protocols: MakerDAO\n\n• Insurance Protocols: Nexus Mutual'
      },
      {
        type: 'link',
        title: 'Explore DeFi Protocols',
        content: {
          title: 'DeFi Pulse',
          url: 'https://defipulse.com',
          description: 'Track the latest metrics and rankings of DeFi protocols'
        }
      },
      {
        type: 'quiz',
        title: 'Module 3 Quiz',
        content: [
          {
            question: 'Which of these is a popular DeFi lending platform?',
            options: [
              'Bitcoin',
              'Aave',
              'Robinhood',
              'Coinbase'
            ],
            correctAnswer: 1
          }
        ]
      },
      // Module 4: DeFi Risks
      {
        type: 'text',
        title: 'Module 4: Understanding DeFi Risks',
        content: 'While DeFi offers many opportunities, it\'s important to understand the risks:\n\n• Smart Contract Risk: Vulnerabilities in code\n\n• Impermanent Loss: Risk for liquidity providers\n\n• Oracle Risk: Issues with price feed accuracy\n\n• Market Risk: Volatility and market manipulation\n\n• Gas Fees: High transaction costs during network congestion'
      },
      {
        type: 'quiz',
        title: 'Module 4 Quiz',
        content: [
          {
            question: 'What is impermanent loss?',
            options: [
              'Losing your private keys',
              'Smart contract failure',
              'Loss faced by liquidity providers due to price changes',
              'Network downtime'
            ],
            correctAnswer: 2
          }
        ]
      },
      // Module 5: Getting Started
      {
        type: 'text',
        title: 'Module 5: Getting Started with DeFi',
        content: 'Ready to start your DeFi journey? Here\'s what you need:\n\n• Set up a Web3 wallet (e.g., MetaMask)\n\n• Understand gas fees and network conditions\n\n• Start with small amounts to learn\n\n• Use testnet first for practice\n\n• Always DYOR (Do Your Own Research)'
      },
      {
        type: 'link',
        title: 'Essential Tools',
        content: {
          title: 'MetaMask',
          url: 'https://metamask.io',
          description: 'The most popular Web3 wallet for accessing DeFi applications'
        }
      },
      {
        type: 'quiz',
        title: 'Final Quiz',
        content: [
          {
            question: 'What should you do before investing in DeFi?',
            options: [
              'Invest all your savings',
              'Skip research and follow trends',
              'Use only mainnet',
              'Start with small amounts and DYOR'
            ],
            correctAnswer: 3
          }
        ]
      }
    ]
  },
  {
    id: 'smart-contract-development',
    slug: 'smart-contract-development',
    title: 'Smart Contract Development',
    description: 'Master the art of writing secure and efficient smart contracts using Solidity.',
    difficulty: 'intermediate',
    duration: '4 hours',
    modules: 6,
    image: '/challenges/smart-contracts.jpg',
    completed: false,
    content: [
      // Module 1: Introduction to Smart Contracts
      {
        type: 'text',
        title: 'Module 1: Introduction to Smart Contracts',
        content: 'Smart contracts are self-executing contracts with terms directly written into code. They form the backbone of decentralized applications (dApps) and enable trustless interactions on blockchain networks.\n\nKey Concepts:\n\n• Immutability: Once deployed, smart contracts cannot be modified\n\n• Transparency: All contract code and interactions are visible on the blockchain\n\n• Deterministic Execution: Same input always produces the same output\n\n• Trustless Operation: No need for intermediaries'
      },
      {
        type: 'video',
        title: 'Understanding Smart Contracts',
        content: 'dQw4w9WgXcQ'
      },
      {
        type: 'code',
        title: 'Your First Smart Contract',
        content: {
          language: 'solidity',
          code: 'pragma solidity ^0.8.0;\n\ncontract HelloWorld {\n    string public message;\n\n    constructor() {\n        message = "Hello, World!";\n    }\n\n    function updateMessage(string memory newMessage) public {\n        message = newMessage;\n    }\n}'
        }
      },
      {
        type: 'quiz',
        title: 'Understanding Smart Contracts',
        content: [
          {
            question: 'What makes smart contracts "smart"?',
            options: [
              'They use artificial intelligence',
              'They are written in advanced programming languages',
              'They self-execute when conditions are met',
              'They can modify their own code'
            ],
            correctAnswer: 2
          }
        ]
      },
      // Module 2: Solidity Fundamentals
      {
        type: 'text',
        title: 'Module 2: Solidity Fundamentals',
        content: 'Solidity is the primary programming language for Ethereum smart contracts. Let\'s explore its fundamental concepts:\n\n• Data Types: uint, int, address, bool, string, bytes\n\n• Variables: State variables, local variables, global variables\n\n• Functions: View, pure, payable, internal, external\n\n• Modifiers: Custom conditions for function execution\n\n• Events: Logging and frontend notifications'
      },
      {
        type: 'code',
        title: 'Data Types and Functions',
        content: {
          language: 'solidity',
          code: 'pragma solidity ^0.8.0;\n\ncontract TokenBasics {\n    // State variables\n    string public name;\n    uint256 public totalSupply;\n    mapping(address => uint256) public balances;\n\n    // Events\n    event Transfer(address indexed from, address indexed to, uint256 value);\n\n    // Constructor\n    constructor(string memory _name, uint256 _totalSupply) {\n        name = _name;\n        totalSupply = _totalSupply;\n        balances[msg.sender] = _totalSupply;\n    }\n\n    // View function\n    function balanceOf(address account) public view returns (uint256) {\n        return balances[account];\n    }\n\n    // Transfer function\n    function transfer(address to, uint256 amount) public returns (bool) {\n        require(balances[msg.sender] >= amount, "Insufficient balance");\n        balances[msg.sender] -= amount;\n        balances[to] += amount;\n        emit Transfer(msg.sender, to, amount);\n        return true;\n    }\n}'
        }
      },
      {
        type: 'quiz',
        title: 'Module 2 Quiz',
        content: [
          {
            question: 'What is the purpose of the "view" keyword in Solidity?',
            options: [
              'To make a function visible to other contracts',
              'To indicate a function only reads state and doesn\'t modify it',
              'To make a function accept ETH payments',
              'To make a function private'
            ],
            correctAnswer: 1
          }
        ]
      },
      // Module 3: Smart Contract Security
      {
        type: 'text',
        title: 'Module 3: Smart Contract Security',
        content: 'Security is paramount in smart contract development. Common vulnerabilities and best practices:\n\n• Reentrancy Attacks: Prevent malicious contract callbacks\n\n• Integer Overflow/Underflow: Use SafeMath or Solidity 0.8+\n\n• Access Control: Implement proper permission systems\n\n• Gas Optimization: Write efficient code\n\n• Error Handling: Use require, assert, and revert properly'
      },
      {
        type: 'code',
        title: 'Secure Contract Example',
        content: {
          language: 'solidity',
          code: 'pragma solidity ^0.8.0;\n\ncontract SecureVault {\n    mapping(address => uint256) private balances;\n    address private owner;\n    bool private locked;\n\n    modifier nonReentrant() {\n        require(!locked, "No reentrancy");\n        locked = true;\n        _;\n        locked = false;\n    }\n\n    modifier onlyOwner() {\n        require(msg.sender == owner, "Not authorized");\n        _;\n    }\n\n    function withdraw() public nonReentrant {\n        uint256 amount = balances[msg.sender];\n        require(amount > 0, "No balance");\n        balances[msg.sender] = 0; // Update state before external call\n        (bool success, ) = msg.sender.call{value: amount}("");\n        require(success, "Transfer failed");\n    }\n}'
        }
      },
      // Module 4: Testing and Deployment
      {
        type: 'text',
        title: 'Module 4: Testing and Deployment',
        content: 'Proper testing is crucial for smart contract development:\n\n• Unit Testing: Test individual functions\n\n• Integration Testing: Test contract interactions\n\n• Test Networks: Deploy to testnets before mainnet\n\n• Gas Optimization: Test gas costs\n\n• Automated Testing: Use testing frameworks'
      },
      {
        type: 'code',
        title: 'Test Script Example',
        content: {
          language: 'javascript',
          code: 'const { expect } = require("chai");\n\ndescribe("Token", function () {\n  let Token;\n  let token;\n  let owner;\n  let addr1;\n  let addr2;\n\n  beforeEach(async function () {\n    Token = await ethers.getContractFactory("Token");\n    [owner, addr1, addr2] = await ethers.getSigners();\n    token = await Token.deploy("Test Token", 1000000);\n  });\n\n  describe("Deployment", function () {\n    it("Should set the right owner", async function () {\n      expect(await token.owner()).to.equal(owner.address);\n    });\n\n    it("Should assign the total supply of tokens to the owner", async function () {\n      const ownerBalance = await token.balanceOf(owner.address);\n      expect(await token.totalSupply()).to.equal(ownerBalance);\n    });\n  });\n});'
        }
      },
      // Module 5: Smart Contract Patterns
      {
        type: 'text',
        title: 'Module 5: Smart Contract Patterns',
        content: 'Common design patterns in smart contract development:\n\n• Factory Pattern: Create new contract instances\n\n• Proxy Pattern: Upgradeable contracts\n\n• Guard Pattern: Access control and security\n\n• State Machine: Manage contract states\n\n• Emergency Stop: Circuit breaker pattern'
      },
      {
        type: 'code',
        title: 'Factory Pattern Example',
        content: {
          language: 'solidity',
          code: 'pragma solidity ^0.8.0;\n\ncontract Token {\n    string public name;\n    address public owner;\n\n    constructor(string memory _name) {\n        name = _name;\n        owner = msg.sender;\n    }\n}\n\ncontract TokenFactory {\n    mapping(address => address[]) public createdTokens;\n\n    event TokenCreated(address tokenAddress, string name);\n\n    function createToken(string memory _name) public {\n        Token token = new Token(_name);\n        createdTokens[msg.sender].push(address(token));\n        emit TokenCreated(address(token), _name);\n    }\n}'
        }
      },
      // Module 6: Advanced Topics
      {
        type: 'text',
        title: 'Module 6: Advanced Topics',
        content: 'Advanced concepts in smart contract development:\n\n• Gas Optimization Techniques\n\n• Cross-Contract Communication\n\n• Upgradeable Contracts\n\n• Oracle Integration\n\n• Layer 2 Solutions'
      },
      {
        type: 'link',
        title: 'Additional Resources',
        content: {
          title: 'Solidity Documentation',
          url: 'https://docs.soliditylang.org',
          description: 'Official Solidity documentation for in-depth learning'
        }
      },
      {
        type: 'quiz',
        title: 'Final Assessment',
        content: [
          {
            question: 'Which pattern is used for upgrading smart contracts?',
            options: [
              'Factory Pattern',
              'Proxy Pattern',
              'Guard Pattern',
              'State Machine Pattern'
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'nft-marketplace',
    slug: 'nft-marketplace',
    title: 'Building NFT Marketplace',
    description: 'Learn to build a full-featured NFT marketplace with smart contracts and modern UI.',
    difficulty: 'advanced',
    duration: '6 hours',
    modules: 5,
    image: '/challenges/nft-marketplace.jpg',
    completed: false,
    content: [
      // Module 1: Introduction to NFT Marketplaces
      {
        type: 'text',
        title: 'Module 1: Understanding NFT Marketplaces',
        content: 'NFT marketplaces are platforms where users can mint, buy, sell, and trade non-fungible tokens. In this module, we\'ll explore:\n\n• Core components of an NFT marketplace\n\n• Key features and functionalities\n\n• Popular NFT standards (ERC-721, ERC-1155)\n\n• Best practices for marketplace development\n\n• Security considerations'
      },
      {
        type: 'video',
        title: 'NFT Marketplace Architecture',
        content: 'dQw4w9WgXcQ'
      },
      {
        type: 'code',
        title: 'Basic NFT Contract',
        content: {
          language: 'solidity',
          code: 'pragma solidity ^0.8.0;\n\nimport "@openzeppelin/contracts/token/ERC721/ERC721.sol";\n\ncontract NFTMarketplace is ERC721 {\n    uint256 private _tokenIds;\n    mapping(uint256 => uint256) private _tokenPrices;\n\n    constructor() ERC721("NFT Marketplace", "NFTM") {}\n\n    function createToken(string memory tokenURI, uint256 price) public returns (uint256) {\n        _tokenIds++;\n        uint256 newTokenId = _tokenIds;\n        _mint(msg.sender, newTokenId);\n        _setTokenURI(newTokenId, tokenURI);\n        _tokenPrices[newTokenId] = price;\n        return newTokenId;\n    }\n}'
        }
      },
      {
        type: 'quiz',
        title: 'NFT Basics Check',
        content: [
          {
            question: 'What makes NFTs unique compared to other tokens?',
            options: [
              'They are more expensive',
              'They are non-fungible (unique)',
              'They are faster to transfer',
              'They use less gas'
            ],
            correctAnswer: 1
          }
        ]
      },
      // Module 2: Smart Contract Development
      {
        type: 'text',
        title: 'Module 2: Marketplace Smart Contracts',
        content: 'Let\'s develop the core smart contracts for our NFT marketplace:\n\n• Listing contract for managing NFT listings\n\n• Escrow contract for secure transactions\n\n• Royalty management system\n\n• Bidding and auction mechanisms\n\n• Fee structure implementation'
      },
      {
        type: 'code',
        title: 'Marketplace Listing Contract',
        content: {
          language: 'solidity',
          code: 'contract NFTListing {\n    struct Listing {\n        address seller;\n        uint256 price;\n        uint256 tokenId;\n        bool isActive;\n    }\n\n    mapping(uint256 => Listing) public listings;\n\n    function createListing(uint256 tokenId, uint256 price) external {\n        require(price > 0, "Price must be greater than 0");\n        listings[tokenId] = Listing({\n            seller: msg.sender,\n            price: price,\n            tokenId: tokenId,\n            isActive: true\n        });\n    }\n\n    function buyNFT(uint256 tokenId) external payable {\n        Listing memory listing = listings[tokenId];\n        require(listing.isActive, "Listing is not active");\n        require(msg.value >= listing.price, "Insufficient payment");\n        // Transfer NFT and payment logic here\n    }\n}'
        }
      },
      // Module 3: Frontend Development
      {
        type: 'text',
        title: 'Module 3: Building the Frontend',
        content: 'In this module, we\'ll create a modern, user-friendly frontend for our NFT marketplace:\n\n• Setting up Next.js and Tailwind CSS\n\n• Implementing wallet connection\n\n• Creating NFT card components\n\n• Building the marketplace gallery\n\n• Adding search and filter functionality'
      },
      {
        type: 'code',
        title: 'NFT Card Component',
        content: {
          language: 'typescript',
          code: 'interface NFTCardProps {\n  id: string\n  name: string\n  image: string\n  price: string\n  seller: string\n}\n\nexport function NFTCard({ id, name, image, price, seller }: NFTCardProps) {\n  return (\n    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">\n      <div className="aspect-square relative">\n        <Image\n          src={image}\n          alt={name}\n          layout="fill"\n          objectFit="cover"\n          className="rounded-t-lg"\n        />\n      </div>\n      <div className="p-4">\n        <h3 className="font-semibold">{name}</h3>\n        <p className="text-sm text-gray-500">{price} ETH</p>\n        <p className="text-xs text-gray-400">Seller: {seller}</p>\n      </div>\n    </div>\n  )\n}'
        }
      },
      // Module 4: Testing and Security
      {
        type: 'text',
        title: 'Module 4: Testing and Security',
        content: 'Ensuring the security and reliability of your NFT marketplace is crucial:\n\n• Writing comprehensive test suites\n\n• Implementing access controls\n\n• Handling edge cases\n\n• Security best practices\n\n• Common vulnerabilities and prevention'
      },
      {
        type: 'code',
        title: 'Test Suite Example',
        content: {
          language: 'typescript',
          code: 'describe("NFT Marketplace", function() {\n  let marketplace;\n  let owner;\n  let buyer;\n\n  beforeEach(async function() {\n    const Marketplace = await ethers.getContractFactory("NFTMarketplace");\n    [owner, buyer] = await ethers.getSigners();\n    marketplace = await Marketplace.deploy();\n    await marketplace.deployed();\n  });\n\n  it("Should create and list NFT", async function() {\n    const price = ethers.utils.parseEther("1.0");\n    await marketplace.createToken("tokenURI", price);\n    const listing = await marketplace.listings(1);\n    expect(listing.price).to.equal(price);\n    expect(listing.seller).to.equal(owner.address);\n  });\n});'
        }
      },
      // Module 5: Deployment and Optimization
      {
        type: 'text',
        title: 'Module 5: Deployment and Optimization',
        content: 'Learn how to deploy and optimize your NFT marketplace:\n\n• Gas optimization techniques\n\n• Contract deployment process\n\n• Frontend deployment and hosting\n\n• Performance optimization\n\n• Monitoring and maintenance'
      },
      {
        type: 'link',
        title: 'Deployment Resources',
        content: {
          title: 'Hardhat Documentation',
          url: 'https://hardhat.org/getting-started',
          description: 'Learn about deploying smart contracts using Hardhat'
        }
      }
    ]
  },
  {
    id: 'crypto-trading',
    slug: 'crypto-trading',
    title: 'Crypto Trading Basics',
    description: 'Learn fundamental and technical analysis for cryptocurrency trading.',
    difficulty: 'beginner',
    duration: '3 hours',
    modules: 5,
    image: '/challenges/crypto-trading.jpg',
    completed: false,
    content: [
      // Module 1: Introduction to Crypto Trading
      {
        type: 'text',
        title: 'Module 1: Understanding Cryptocurrency Markets',
        content: 'Introduction to cryptocurrency trading fundamentals:\n\n• Market Structure: Exchanges, order books, and liquidity\n\n• Types of Orders: Market, limit, stop-loss\n\n• Trading Pairs: Base and quote currencies\n\n• Market Participants: Makers, takers, market makers\n\n• Trading Psychology: Managing emotions and discipline'
      },
      {
        type: 'video',
        title: 'Crypto Market Basics',
        content: 'dQw4w9WgXcQ'
      },
      {
        type: 'quiz',
        title: 'Market Basics Quiz',
        content: [
          {
            question: 'What is a limit order?',
            options: [
              'An order that executes immediately at market price',
              'An order to buy/sell at a specific price or better',
              'An order that closes your position',
              'An order that uses leverage'
            ],
            correctAnswer: 1
          }
        ]
      },
      // Module 2: Technical Analysis
      {
        type: 'text',
        title: 'Module 2: Technical Analysis Fundamentals',
        content: 'Learn essential technical analysis tools:\n\n• Chart Patterns: Support, resistance, trends\n\n• Technical Indicators: Moving averages, RSI, MACD\n\n• Volume Analysis: Trading volume, volume indicators\n\n• Candlestick Patterns: Doji, hammer, engulfing\n\n• Trend Analysis: Trend identification and following'
      },
      {
        type: 'code',
        title: 'Simple Moving Average Calculation',
        content: {
          language: 'python',
          code: 'def calculate_sma(prices, period):\n    if len(prices) < period:\n        return None\n    return sum(prices[-period:]) / period\n\n# Example usage\nprices = [100, 102, 104, 103, 105]\nperiod = 3\nsma = calculate_sma(prices, period)\nprint(f"{period}-day SMA: {sma}")'
        }
      },
      // Module 3: Risk Management
      {
        type: 'text',
        title: 'Module 3: Risk Management Strategies',
        content: 'Essential risk management principles:\n\n• Position Sizing: Managing trade size\n\n• Stop Loss Placement: Protecting capital\n\n• Risk-Reward Ratios: Optimal trade setups\n\n• Portfolio Diversification: Spreading risk\n\n• Risk Management Tools: Using stops and limits'
      },
      {
        type: 'quiz',
        title: 'Risk Management Quiz',
        content: [
          {
            question: 'What is a good risk-reward ratio for trading?',
            options: [
              '1:1',
              '1:2',
              '1:3 or better',
              'No ratio needed'
            ],
            correctAnswer: 2
          }
        ]
      },
      // Module 4: Trading Strategies
      {
        type: 'text',
        title: 'Module 4: Basic Trading Strategies',
        content: 'Popular trading strategies for beginners:\n\n• Trend Following: Following market momentum\n\n• Range Trading: Trading between support and resistance\n\n• Breakout Trading: Capitalizing on pattern breaks\n\n• Position Trading: Long-term holding strategies\n\n• Dollar Cost Averaging: Systematic buying'
      },
      // Module 5: Market Analysis
      {
        type: 'text',
        title: 'Module 5: Market Analysis Tools',
        content: 'Tools and platforms for market analysis:\n\n• Trading Platforms: Popular exchanges and tools\n\n• Chart Analysis Tools: TradingView, technical indicators\n\n• Market Data Sources: Price feeds, news sources\n\n• Portfolio Tracking: Managing your investments\n\n• Analysis Software: Professional trading tools'
      },
      {
        type: 'link',
        title: 'Trading Resources',
        content: {
          title: 'TradingView',
          url: 'https://www.tradingview.com',
          description: 'Popular platform for technical analysis and chart patterns'
        }
      }
    ]
  },
  {
    id: 'dao-governance',
    slug: 'dao-governance',
    title: 'DAO Governance',
    description: 'Master the principles of decentralized governance and DAO operations.',
    difficulty: 'intermediate',
    duration: '3 hours',
    modules: 4,
    image: '/challenges/dao-governance.jpg',
    completed: false,
    content: [
      // Module 1: DAO Fundamentals
      {
        type: 'text',
        title: 'Module 1: Understanding DAOs',
        content: 'Decentralized Autonomous Organizations (DAOs) represent a new paradigm in organizational structure:\n\n• What is a DAO?\n\n• Types of DAOs\n\n• DAO governance models\n\n• Key components of a DAO\n\n• Real-world DAO examples'
      },
      {
        type: 'video',
        title: 'Introduction to DAOs',
        content: 'dQw4w9WgXcQ'
      },
      // Module 2: Governance Mechanisms
      {
        type: 'text',
        title: 'Module 2: Governance Mechanisms',
        content: 'Explore different governance mechanisms used in DAOs:\n\n• Token-based voting\n\n• Quadratic voting\n\n• Delegation systems\n\n• Proposal lifecycle\n\n• Voting strategies'
      },
      {
        type: 'code',
        title: 'Basic Governance Contract',
        content: {
          language: 'solidity',
          code: 'pragma solidity ^0.8.0;\n\ncontract DAOGovernance {\n    struct Proposal {\n        uint256 id;\n        address proposer;\n        string description;\n        uint256 forVotes;\n        uint256 againstVotes;\n        bool executed;\n        mapping(address => bool) hasVoted;\n    }\n\n    function createProposal(string memory description) external {\n        // Implementation\n    }\n\n    function vote(uint256 proposalId, bool support) external {\n        // Implementation\n    }\n}'
        }
      },
      // Module 3: Implementation
      {
        type: 'text',
        title: 'Module 3: Building a DAO',
        content: 'Learn to implement a basic DAO:\n\n• Setting up governance tokens\n\n• Creating proposal systems\n\n• Implementing voting mechanisms\n\n• Managing treasury\n\n• Access control'
      },
      // Module 4: Best Practices
      {
        type: 'text',
        title: 'Module 4: DAO Best Practices',
        content: 'Essential practices for running a successful DAO:\n\n• Community engagement\n\n• Proposal guidelines\n\n• Security considerations\n\n• Treasury management\n\n• Governance parameters'
      }
    ]
  },
  {
    id: 'defi-security',
    slug: 'defi-security',
    title: 'DeFi Security',
    description: 'Learn to identify and prevent common security vulnerabilities in DeFi protocols.',
    difficulty: 'advanced',
    duration: '5 hours',
    modules: 7,
    image: '/challenges/defi-security.jpg',
    completed: false,
    content: [
      // Module 1: Security Fundamentals
      {
        type: 'text',
        title: 'Module 1: DeFi Security Basics',
        content: 'Understanding the security landscape in DeFi:\n\n• Common Attack Vectors: Known vulnerabilities\n\n• Security Best Practices: Industry standards\n\n• Audit Process: Code review and testing\n\n• Risk Assessment: Identifying potential threats\n\n• Security Tools: Analysis and monitoring'
      },
      // Module 2: Smart Contract Vulnerabilities
      {
        type: 'text',
        title: 'Module 2: Common Vulnerabilities',
        content: 'Deep dive into common smart contract vulnerabilities:\n\n• Reentrancy Attacks: Prevention and detection\n\n• Flash Loan Attacks: Understanding and mitigation\n\n• Oracle Manipulation: Securing price feeds\n\n• Access Control Issues: Permission management\n\n• Integer Overflow/Underflow: Safe math operations'
      },
      {
        type: 'code',
        title: 'Reentrancy Guard Example',
        content: {
          language: 'solidity',
          code: 'contract ReentrancyGuard {\n    bool private locked;\n\n    modifier nonReentrant() {\n        require(!locked, "Reentrant call");\n        locked = true;\n        _;\n        locked = false;\n    }\n\n    function withdraw() public nonReentrant {\n        uint256 amount = balances[msg.sender];\n        require(amount > 0);\n        balances[msg.sender] = 0;\n        (bool success, ) = msg.sender.call{value: amount}("");\n        require(success, "Transfer failed");\n    }\n}'
        }
      },
      // Module 3: Security Auditing
      {
        type: 'text',
        title: 'Module 3: Security Auditing',
        content: 'Learn professional security auditing techniques:\n\n• Code Review Process: Systematic analysis\n\n• Testing Methodologies: Unit and integration tests\n\n• Automated Tools: Security scanners\n\n• Documentation: Reporting and recommendations\n\n• Post-Audit Actions: Implementing fixes'
      },
      {
        type: 'code',
        title: 'Security Test Suite',
        content: {
          language: 'javascript',
          code: 'describe("Security Tests", function() {\n  it("Should prevent reentrancy", async function() {\n    const attacker = await AttackerContract.deploy();\n    await expect(\n      attacker.attack()\n    ).to.be.revertedWith("Reentrant call");\n  });\n\n  it("Should validate access control", async function() {\n    await expect(\n      contract.connect(nonAdmin).adminFunction()\n    ).to.be.revertedWith("Not authorized");\n  });\n});'
        }
      },
      // Module 4: Attack Simulation
      {
        type: 'text',
        title: 'Module 4: Attack Simulation',
        content: 'Practice identifying and exploiting vulnerabilities:\n\n• Setting Up Test Environment\n\n• Creating Attack Scenarios\n\n• Executing Exploit POCs\n\n• Analyzing Attack Vectors\n\n• Implementing Fixes'
      },
      // Module 5: Monitoring and Detection
      {
        type: 'text',
        title: 'Module 5: Security Monitoring',
        content: 'Implementing security monitoring systems:\n\n• Real-time Monitoring: Transaction analysis\n\n• Alert Systems: Detecting suspicious activity\n\n• Incident Response: Handling security events\n\n• Analytics Tools: Security metrics\n\n• Reporting Systems: Security dashboards'
      },
      // Module 6: Advanced Security Patterns
      {
        type: 'text',
        title: 'Module 6: Security Patterns',
        content: 'Advanced security design patterns:\n\n• Checks-Effects-Interactions Pattern\n\n• Emergency Stop Pattern\n\n• Access Control Patterns\n\n• Upgrade Patterns\n\n• State Machine Patterns'
      },
      // Module 7: Case Studies
      {
        type: 'text',
        title: 'Module 7: Security Case Studies',
        content: 'Analysis of real-world DeFi security incidents:\n\n• Historical Attacks: What happened\n\n• Attack Analysis: How it worked\n\n• Prevention Measures: What could have prevented it\n\n• Lessons Learned: Key takeaways\n\n• Future Implications: Improving security'
      }
    ]
  },
  {
    id: 'web3-fundamentals',
    slug: 'web3-fundamentals',
    title: 'Web3 Development',
    description: 'Build decentralized applications (dApps) using Web3 technologies.',
    difficulty: 'beginner',
    duration: '4 hours',
    modules: 7,
    image: '/challenges/web3-dev.jpg',
    completed: false,
    content: [
      // Module 1: Web3 Introduction
      {
        type: 'text',
        title: 'Module 1: Introduction to Web3',
        content: 'Understanding Web3 fundamentals:\n\n• What is Web3?: Decentralized internet\n\n• Blockchain Basics: Core concepts\n\n• Web3 Stack: Technologies and tools\n\n• dApps: Decentralized applications\n\n• Use Cases: Real-world applications'
      },
      {
        type: 'video',
        title: 'Web3 Overview',
        content: 'dQw4w9WgXcQ'
      },
      // Module 2: Web3.js Basics
      {
        type: 'text',
        title: 'Module 2: Working with Web3.js',
        content: 'Learn to use Web3.js library:\n\n• Setting Up Web3: Installation and configuration\n\n• Provider Connection: Connecting to networks\n\n• Account Management: Working with wallets\n\n• Contract Interaction: ABI and methods\n\n• Transaction Handling: Sending and receiving'
      },
      {
        type: 'code',
        title: 'Web3 Connection',
        content: {
          language: 'javascript',
          code: 'import Web3 from "web3";\n\nasync function connectWeb3() {\n  if (typeof window.ethereum !== "undefined") {\n    const web3 = new Web3(window.ethereum);\n    try {\n      await window.ethereum.request({ method: "eth_requestAccounts" });\n      const accounts = await web3.eth.getAccounts();\n      console.log("Connected account:", accounts[0]);\n      return web3;\n    } catch (error) {\n      console.error("User denied account access");\n    }\n  }\n}'
        }
      },
      // Module 3: Smart Contract Integration
      {
        type: 'text',
        title: 'Module 3: Smart Contract Integration',
        content: 'Integrating smart contracts in dApps:\n\n• Contract Deployment: Using Web3\n\n• Contract Interaction: Reading and writing\n\n• Event Handling: Listening to events\n\n• Error Handling: Managing failures\n\n• Gas Management: Optimizing transactions'
      },
      {
        type: 'code',
        title: 'Contract Interaction',
        content: {
          language: 'javascript',
          code: 'const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);\n\nasync function interactWithContract() {\n  try {\n    const result = await contract.methods\n      .someFunction()\n      .send({ from: userAddress });\n    console.log("Transaction:", result);\n  } catch (error) {\n    console.error("Transaction failed:", error);\n  }\n}'
        }
      },
      // Module 4: Frontend Development
      {
        type: 'text',
        title: 'Module 4: Building the Frontend',
        content: 'Creating user interfaces for dApps:\n\n• React Integration: Components and hooks\n\n• Wallet Connection: MetaMask integration\n\n• Transaction UI: Managing transactions\n\n• State Management: Using React context\n\n• Error Handling: User feedback'
      },
      // Module 5: Testing and Debugging
      {
        type: 'text',
        title: 'Module 5: Testing Web3 Apps',
        content: 'Testing decentralized applications:\n\n• Test Networks: Using testnets\n\n• Unit Testing: Testing components\n\n• Integration Testing: End-to-end tests\n\n• Debugging Tools: Developer tools\n\n• Performance Testing: Optimization'
      },
      // Module 6: Deployment
      {
        type: 'text',
        title: 'Module 6: Deploying Web3 Apps',
        content: 'Deploying decentralized applications:\n\n• Hosting Options: Decentralized hosting\n\n• IPFS Integration: Decentralized storage\n\n• CI/CD Pipeline: Automated deployment\n\n• Monitoring: Performance tracking\n\n• Maintenance: Updates and fixes'
      },
      // Module 7: Advanced Topics
      {
        type: 'text',
        title: 'Module 7: Advanced Topics',
        content: 'Advanced concepts in smart contract development:\n\n• Gas Optimization Techniques\n\n• Cross-Contract Communication\n\n• Upgradeable Contracts\n\n• Oracle Integration\n\n• Layer 2 Solutions'
      },
      {
        type: 'link',
        title: 'Additional Resources',
        content: {
          title: 'Web3.js Documentation',
          url: 'https://web3js.readthedocs.io',
          description: 'Official Web3.js documentation for in-depth learning'
        }
      }
    ]
  },
  {
    id: 'defi-yield-strategies',
    slug: 'defi-yield-strategies',
    title: 'DeFi Yield Strategies',
    description: 'Master advanced yield farming strategies and portfolio management.',
    difficulty: 'advanced',
    duration: '4 hours',
    modules: 5,
    image: '/challenges/yield-strategies.jpg',
    completed: false,
    content: [
      // Module 1: Yield Farming Basics
      {
        type: 'text',
        title: 'Module 1: Understanding Yield Farming',
        content: 'Introduction to yield farming strategies:\n\n• What is Yield Farming?: Basic concepts\n\n• Types of Yields: Trading fees, liquidity mining, incentives\n\n• Risk Assessment: Understanding risks and rewards\n\n• Protocol Analysis: Evaluating opportunities\n\n• APY vs APR: Understanding returns'
      },
      // Module 2: Advanced Strategies
      {
        type: 'text',
        title: 'Module 2: Advanced Yield Strategies',
        content: 'Complex yield farming techniques:\n\n• Leveraged Farming: Using borrowed funds\n\n• Multi-Token Strategies: Combining protocols\n\n• Flash Loan Farming: Arbitrage opportunities\n\n• Yield Aggregators: Automated strategies\n\n• Risk Mitigation: Hedging positions'
      },
      {
        type: 'code',
        title: 'Yield Calculator',
        content: {
          language: 'javascript',
          code: 'function calculateAPY(principal, reward, time) {\n  const periods = 365 / time; // Assuming daily compounds\n  const r = reward / principal; // Return per period\n  const apy = Math.pow(1 + r, periods) - 1;\n  return apy * 100;\n}\n\nfunction calculateILoss(price1Change, price2Change) {\n  const sqrtK = Math.sqrt(price1Change * price2Change);\n  const iloss = 2 * sqrtK / (1 + sqrtK) - 1;\n  return iloss * 100;\n}'
        }
      },
      // Module 3: Portfolio Management
      {
        type: 'text',
        title: 'Module 3: Portfolio Management',
        content: 'Managing yield farming portfolios:\n\n• Portfolio Diversification: Spreading risk\n\n• Rebalancing Strategies: Maintaining allocations\n\n• Performance Tracking: Monitoring returns\n\n• Risk Management: Setting stop-losses\n\n• Tax Considerations: Record keeping'
      },
      // Module 4: Automation
      {
        type: 'text',
        title: 'Module 4: Strategy Automation',
        content: 'Automating yield farming strategies:\n\n• Smart Contract Development: Auto-compounding\n\n• Bot Development: Trading automation\n\n• Monitoring Systems: Alert setup\n\n• Gas Optimization: Reducing costs\n\n• Error Handling: Fail-safes'
      },
      {
        type: 'code',
        title: 'Auto-Compound Contract',
        content: {
          language: 'solidity',
          code: 'contract YieldOptimizer {\n    struct Position {\n        uint256 amount;\n        uint256 lastCompound;\n        uint256 rewards;\n    }\n\n    mapping(address => Position) public positions;\n\n    function compound() external {\n        Position storage pos = positions[msg.sender];\n        uint256 rewards = calculateRewards(pos);\n        reinvestRewards(rewards);\n        pos.lastCompound = block.timestamp;\n    }\n\n    function calculateRewards(Position memory pos) internal view returns (uint256) {\n        // Implementation\n    }\n\n    function reinvestRewards(uint256 amount) internal {\n        // Implementation\n    }\n}'
        }
      },
      // Module 5: Market Analysis
      {
        type: 'text',
        title: 'Module 5: Market Analysis',
        content: 'Analyzing yield farming opportunities:\n\n• Protocol Research: Due diligence\n\n• Market Trends: Identifying opportunities\n\n• Risk Assessment: Evaluating protocols\n\n• Yield Comparison: Comparing options\n\n• Economic Analysis: Token economics'
      }
    ]
  },
  {
    id: 'defi-lending',
    slug: 'defi-lending',
    title: 'DeFi Lending Protocols',
    description: 'Learn to build and interact with decentralized lending protocols.',
    difficulty: 'intermediate',
    duration: '4 hours',
    modules: 4,
    image: '/challenges/defi-lending.jpg',
    completed: false,
    content: [
      // Module 1: Lending Basics
      {
        type: 'text',
        title: 'Module 1: Understanding DeFi Lending',
        content: 'Introduction to decentralized lending protocols:\n\n• How DeFi lending works\n\n• Key concepts (collateralization, liquidation)\n\n• Interest rate models\n\n• Risk management\n\n• Popular lending protocols'
      },
      // Module 2: Smart Contracts
      {
        type: 'text',
        title: 'Module 2: Lending Smart Contracts',
        content: 'Develop smart contracts for lending:\n\n• Implementing collateral systems\n\n• Interest rate calculations\n\n• Liquidation mechanisms\n\n• Token standards\n\n• Security considerations'
      },
      {
        type: 'code',
        title: 'Basic Lending Pool',
        content: {
          language: 'solidity',
          code: 'contract LendingPool {\n    struct LoanPosition {\n        uint256 amount;\n        uint256 collateral;\n        uint256 timestamp;\n        address borrower;\n    }\n\n    function deposit() external payable {\n        // Implementation\n    }\n\n    function borrow(uint256 amount) external {\n        // Implementation\n    }\n\n    function repay() external payable {\n        // Implementation\n    }\n}'
        }
      },
      // Module 3: Risk Management
      {
        type: 'text',
        title: 'Module 3: Risk Management',
        content: 'Understanding and managing risks in lending protocols:\n\n• Collateral factors\n\n• Liquidation thresholds\n\n• Oracle integration\n\n• Emergency procedures\n\n• Market risks'
      },
      // Module 4: Integration
      {
        type: 'text',
        title: 'Module 4: Protocol Integration',
        content: 'Learn to integrate with existing lending protocols:\n\n• Aave integration\n\n• Compound integration\n\n• Flash loans\n\n• Yield strategies\n\n• Best practices'
      }
    ]
  }
] 