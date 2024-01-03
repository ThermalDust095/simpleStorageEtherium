// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

pragma experimental ABIEncoderV2; // Enable ABIEncoderV2 for returning dynamic arrays


contract simpleStorage{

    uint256 public favouriteNumber = 5;
    

    struct People{
        string name;
        uint256 favNumber;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavouriteNumber;

    function store (string memory name, uint256 _fav) public {
        favouriteNumber = _fav;
        people.push(People(name, _fav));
        nameToFavouriteNumber[name] = _fav;
    }

    function retrieve(uint256 _index) public view returns(People memory){
        return people[_index];
    }

}