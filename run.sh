sudo apt update
sudo apt install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
 https://download.docker.com/linux/debian $(lsb_release -cs) stable" |
  sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt update

sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo apt install -y git
git clone https://github.com/muhammadIdhamMaarif/megumi-visitor.git
cd megumi-visitor

sudo docker build -t mgm-lab-visitor .

sudo docker run -d -p 80:80 --name megumi-visitor --restart unless-stopped mgm-lab-visitor:latest
