pragma solidity ^0.6.12;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BirthdayCard is ERC721 {
    event BirthdayCardCreated (
        uint tokenId,
        string imageURL,
        uint date,
        address payable from
    );

    constructor() ERC721("Bday", "BDAY") public  {}

    function mintBirthdayCard(string memory _tokenURI) external {
        uint _tokenId = totalSupply().add(1);
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        emit BirthdayCardCreated(_tokenId, _tokenURI, now, msg.sender);
    }

}

