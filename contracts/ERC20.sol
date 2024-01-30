// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ERC20 {
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    uint256 private _totalSupply;
    address private _owner;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Mint(address indexed account, uint256 amount);
    event Burn(address indexed account, uint256 amount);

    error MintToZeroAddress();
    error BurnFromZeroAddress();
    error MintOwnerOnly();
    error BurnAmountExceedsBalance();
    error TransferToZeroAddress();
    error TransferAmountExceedsBalance();
    error ApproveFromZeroAddress();
    error ApproveToZeroAddress();
    error AmountExceedsApproveBalance();
    error NotApproveAmount();

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 initialSupply_,
        address owner_
    ) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
        _totalSupply = initialSupply_;
        _owner = owner_;
        _balances[owner_] = initialSupply_;
        emit Mint(owner_, initialSupply_);
    }

    /// @notice The function returns the name of the token.
    function name() public view returns (string memory) {
        return _name;
    }

    /// @notice The function returns the symbol of the token.
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /// @notice The function must return a decimal value (number of decimal places).
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    /// @notice The function returns the total issuance of the token.
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /// @notice The function returns the balance at the address of a particular user.
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /// @notice The function returns the number of owner tokens approved for use by spender.
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }

    /// @notice The function transfers tokens from the sender's address to the recipient's address.
    function transfer(address to, uint256 amount) public returns (bool) {
        _transfer(msg.sender, to, amount, false);
        return true;
    }

    /// @notice The function allows the spender to use msg.sender's tokens in an amount.
    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    /// @notice The function transfers tokens from the from address to the to address. That is, change the balances of from and to addresses by amount.
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        _transfer(from, to, amount, true);

        _allowed[from][to] = _allowed[from][to] - amount;

        return true;
    }

    /// @notice The function increases the number of tokens allowed for spender's use by addedValue.
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        if (spender == address(0)) {
            revert ApproveToZeroAddress();
        }

        if (_allowed[msg.sender][spender] == 0) {
            revert NotApproveAmount();
        }

        _allowed[msg.sender][spender] = _allowed[msg.sender][spender] + addedValue;

        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /// @notice The function reduces the number of tokens allowed to be used by the spender by subtractedValue
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        if (spender == address(0)) {
            revert ApproveToZeroAddress();
        }

        if (_allowed[msg.sender][spender] == 0) {
            revert NotApproveAmount();
        }

        if (subtractedValue > _allowed[msg.sender][spender]) {
            revert AmountExceedsApproveBalance();
        }

        _allowed[msg.sender][spender] = _allowed[msg.sender][spender] - subtractedValue;
        emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
        return true;
    }

    /// @notice The function issues new tokens - increases the value of totalSupply and the balance of the account address by the amount amount. Can be called only by the owner of the contract.
    function mint(address account, uint256 amount) public {
        if (msg.sender != _owner) {
            revert MintOwnerOnly();
        }

        if (account == address(0)) {
            revert MintToZeroAddress();
        }

        _totalSupply += amount;
        _balances[account] += amount;

        emit Mint(account, amount);
        emit Transfer(address(0), account, amount);
    }

    /// @notice The function burns tokens - decreases the value of totalSupply and the balance of the address account by the amount. Can be called only by the owner of the contract.
    function burn(address account, uint256 amount) public {
        if (msg.sender != _owner) {
            revert MintOwnerOnly();
        }

        if (account == address(0)) {
            revert BurnFromZeroAddress();
        }

        if (amount >= _balances[account]) {
            revert BurnAmountExceedsBalance();
        }

        _totalSupply -= amount;
        _balances[account] -= amount;

        emit Burn(account, amount);
        emit Transfer(account, address(0), amount);
    }

    /// @notice The function burns tokens - decreases the value of totalSupply and the balance of the address account by the amount. Can be called only by the owner of the contract.
    function _transfer(address from, address to, uint256 amount, bool checkedAllowed) internal {
        if (to == address(0)) {
            revert TransferToZeroAddress();
        }

        if (amount >= _balances[from]) {
            revert TransferAmountExceedsBalance();
        }

        if (checkedAllowed && amount > _allowed[from][to]) {
            revert AmountExceedsApproveBalance();
        }

        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
    }

    /// @notice The function burns tokens - decreases the value of totalSupply and the balance of the address account by the amount. Can be called only by the owner of the contract.
    function _approve(address owner, address spender, uint256 amount) internal {
        if (spender == address(0)) {
            revert ApproveToZeroAddress();
        }

        _allowed[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}
