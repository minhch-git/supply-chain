pragma solidity ^0.5.0;
import "./Product.sol";

contract Marketplace {
    string public name;
    uint256 public productCount = 0;

    mapping(uint256 => S_Product) public products;
    enum SupplyChainState {
        Created,
        Paid,
        Delivered
    }

    struct S_Product {
        Product product;
        uint256 index;
        string name;
        uint256 price;
        address payable owner;
        Marketplace.SupplyChainState state;
    }

    event ProductCreated(
        Product product,
        uint256 index,
        string name,
        uint256 price,
        address payable owner,
        uint256 step
    );

    event ProductPurchased(
        Product product,
        uint256 index,
        string name,
        uint256 price,
        address payable owner,
        uint256 step
    );

    constructor() public {
        name = "Marketplace";
    }

    function createProduct(string memory _name, uint256 _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);

        // Increment product count
        productCount++;

        // Create the product
        Product product = new Product(this, productCount, _name, _price);

        products[productCount] = S_Product(
            product,
            productCount,
            _name,
            _price,
            msg.sender,
            SupplyChainState.Created
        );

        // Trigger an event
        emit ProductCreated(
            product,
            productCount,
            products[productCount].name,
            products[productCount].price,
            products[productCount].owner,
            uint256(products[productCount].state)
        );
    }

    function purchaseProduct(uint256 index) public payable {
        // Fetch the product
        S_Product memory _product = products[index];

        // Fetch the owner
        address payable _seller = _product.owner;

        // Make sure the product has a valid id
        require(_product.index > 0 && _product.index <= productCount);

        // Require that there is enough Ether in the transaction
        require(msg.value == _product.price, "Only full payments accepted!");

        // Require that the product has not been purchased already
        require(
            _product.state == SupplyChainState.Created,
            "Product is further in the chain!"
        );

        // Require that the buyer is not the seller
        require(_seller != msg.sender);

        // Transfer ownership to the buyer
        _product.owner = msg.sender;

        // Mark as purchased
        _product.state = SupplyChainState.Paid;

        // Update the product
        products[index] = _product;

        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);

        // Trigger an event
        emit ProductPurchased(
            _product.product,
            productCount,
            _product.name,
            _product.price,
            _product.owner,
            uint256(products[index].state)
        );
    }
}
