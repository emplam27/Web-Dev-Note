# README





## VirtualBox & Vagrant 설치, 가상 환경 구축

> VirtualBox: 가상 머신. 아무런 OS가 없는 가상 컴퓨터
>
> Vagrant: 가상머신을 편리하게 사용 가능
>
> 각 가상머신에 이더리움 환경을 구축합니다.



#### Vagrant 사용법

```powershell
> vagrant up  # 가상머신 실행
> vagrant halt  # 가상머신 정지
> vagrant status  # 가상머신 실행 상태 확인
> vagrant ssh <name>  # 가상머진 접속(로그인)
> logout  # (로그인 상태에서) 로그아웃
> vagrant reload  # 가상머신 재부팅
```



#### Vagrant 환경설정

> eth0: 192.168.50.10 / eth1: 192.168.50.11
>
> Peer 연결에 활용됩니다.

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.

VAGRANT_API_VERSION = "2"

vms = {
  'eth0' => '10',
  'eth1' => '11'
}

Vagrant.configure(VAGRANT_API_VERSION) do |config|
  config.vm.box = "ubuntu/bionic64"
  vms.each do |key, value|
    config.vm.define "#{key}" do |node|
      node.vm.network "private_network", ip: "192.168.50.#{value}"
      if "#{key}" == "eth0"
        node.vm.network "forwarded_port", guest: 8545, host: 8545
      end
      node.vm.hostname = "#{key}"
      node.vm.provider "virtualbox" do |nodev|
        nodev.memory = 2048
      end
    end
  end
end
```



#### Geth 설치

```shell
# 가상서버 실행
$ vagrant up
$ vagrant ssh eth0

# 이더리움 설치
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get install ethereum

# 가상머신에서 수행
$ mkdir -p dev/eth_localdata
$ cd dev/eth_localdata
$ vi genesis.json
```



#### genesis.json

```json
{ 
    "config": {
    },
    "difficulty": "0x10",
    "gasLimit": "9999999",
    "nonce": "0xdeadbeefdeadbeef",
    "extraData": "",
    "alloc": {}
}
```



#### Geth 초기화 & 구동

```shell
# Geth 초기화
$ geth --datadir . init genesis.json

# Geth 구동: eth0 (RPC)
$ geth --datadir . --port 30303 --networkid 921 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --allow-insecure-unlock console -nousb

# Geth 구동: eth1 (RPC X)
$ geth --datadir . --port 30303 --networkid 921 --rpc --rpcaddr localhost --rpcport 8545 --rpccorsdomain "*" --rpcapi "" --allow-insecure-unlock console -nousb
```

>- --networkid 네트워크 식별자 // 채굴을 사용할 수 있는 CPU 스레드 수 를 지정함 기본값 1
>- --mine // 채굴 활성화
>- --rpc // HTTP-RPC 서버를 활성화 하고, 별도의 콘솔을 연결할 때 필요한 옵션임
>- --nodiscover // 생성자의 노드를 다른 노드에서 검색할 수 없게 하는 옵션
>- --maxpeers // 피어를 연결할 최대 허용치
>- --datadir // chaindata 와 keystore가 쌓이게 할 위치
>- --console // 노드에 명령어를 전달할 수 있는 자바스크립트 콘솔
>- --rpcaddr // HTTP RPC Server 호스트 ( default : "localhost" )
>- --rpcport // HTTP RPC 포트 ( default : 8545" )
>- --rpcapi // RPC API 모듈 (eth, miner, admin, personal, web3....)
>- --bootnodes // 부트노드에 연결할 enode 주소를 넣으면 자동으로 해당 Peer가 부트노드와 연결됨
>- --password // 계정의 password 파일
>- --etherbase // 이더베이스 설정 마이닝 시 보상을 얻을 수 있는 주소
>- --unlock // account list 중 unlock을 시킬 계정의 index 주소를 넣음
>





## 이더리움 채굴 및 송금

> 계정 생성, 채굴, 송금 방법입니다.



#### 이더리움 계정 생성 및 채굴 방법

> 이더리움 계정을 생성하고, 채굴을 진행합니다. 

```powershell
# 계정생성 * 2
> personal.newAccount("test1234")
# 계정 비밀번호: test1234

# 계정확인, ["0번계정_hash","1번계정_hash"...]
> eth.accounts

# 코인베이스 설정 및 채굴
> eth.coinbase
> miner.setEtherbase(eth.accounts[0])
> miner.start()
> miner.stop()

# mining 중인지 확인
> eth.mining

# 블럭 수 확인
> eth.blockNumber

# 계정들 잔액 확인
> eth.getBalance(eth.accounts[0])
> eth.getBalance(eth.accounts[1])
```



#### 같은 가상머신 내 계정간 송금하기

```powershell
# 계정 잠금 풀기
> personal.unlockAccount(eth.accounts[0])

# 송금
> eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value:web3.toWei(5,"ether")})

# 트랜잭션 확인 (리스트 안에 생성 확인)
> eth.pendingTransactions

# 블록을 생성하기 위한 채굴, 블록 생성되면 중단
> miner.start()
> miner.stop()

# 트랜잭션 확인 (리스트 안에 삭제 확인, 삭제되어야만 송금된 것임)
> eth.pendingTransactions

# 송금받은 계정 잔액 확인
> eth.getBalance(eth.accounts[1])
```





#### 다른 가상머신 계정간 송금하기 (Peer 연결하기)

> 다른 가상머신간 연결은 addPeer를 통해 진행합니다.

```powershell
# 계정 잠금 풀기
> personal.unlockAccount(eth.accounts[0])

# eth0 enode 확인, enode 복사
> admin.nodeInfo.enode

# eth1에서 addPeer, @뒤 ip주소는 vagrantfile에 지정한 ip주소, :뒤 포트번호에는 geth 실행한 포트번호 
> admin.addPeer("enode주소@192.168.50.10:30303?discport=0")

# peer 연결되었는지 확인
> admin.peers

# 각 peer의 계정끼리 송금 (현재 노드의 0번 계정에서 다른 노드의 계정으로 송금하는 경우)
eth.sendTransaction({from:eth.accounts[0], to:"다른_가성머신_계정의_hash값", value:web3.toWei(5,"ether")})

# 일정시간 마이닝 진행(블록 만들기) 후 잔액 확인
> miner.start()
> miner.stop()
> eth.getBalance(eth.accounts[0])
```





## Metamask에 계정 등록하기



#### Metamask 설치

> 1. 확장프로그램으로 Metamask 설치
> 2. 기본계정 생성



#### RPC 네트워크 연결하기

> 1. 우측 상단 `네트워크`에서 `사용자 정의 RPC`
> 2. 네트워크 이름: `임의설정`, 새로운 RPC URL: `http://192.168.50.10:8545` 
>    (vagrantfile에 적혀있는 ip와 port 사용)
> 3. 저장



#### eht0 계정 등록하기

> 1. Geth 콘솔로 돌아와 eth0의 `~/dev/eth_localdata/keystore` 디랙토리로 이동
> 2. `ll` 명령어 입력, `UTC-2020-...`로 시작하는 파일들이 계정 정보를 담고 있는 파일
> 3. 잔액이 있는 계정의 파일로 접속 `vi UTC-2020-...`
> 4. 임의의 `user.json`파일을 만들어 해당 내용 복사 (해당 repo의 `user1.json` 참고)
> 5. Metamask로 돌아와 우측 상단 `내 계정`에서 `계정 가져오기`
> 6. 형식선택을 `JSON 파일`로 하여 `user.json`파일을 불러온 후 가져오기
> 7. 메인화면에서 잔액 확인









