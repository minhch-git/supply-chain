pragma solidity ^0.5.0;
import "./Marketplace.sol";

contract Product {
    Marketplace parentContract;
    uint256 public index;
    string public name;
    uint256 public price;
    uint256 public state;

    constructor(
        Marketplace _parentContract,
        uint256 _index,
        string memory _name,
        uint256 _price
    ) public {
        parentContract = _parentContract;
        index = _index;
        name = _name;
        price = _price;
    }

    function getProductByIndex(uint256 _index ) public view returns(uint256) {
        require(index == _index);
        return index;
    }
}
