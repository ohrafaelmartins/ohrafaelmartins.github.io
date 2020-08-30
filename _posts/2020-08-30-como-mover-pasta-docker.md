---
layout: post
title:  "DevOps - Como mover o diretório de dados padrão do docker para outro local no Linux"
author: "Rafael Martins"
comments: true
---

Ao trabalhar com docker é provavel que em algum momento falte espaço suficiente  na partição raiz para armazenar novos contêineres do Docker. Uma alternativa neste caso é montar um disco somente para essa finalidade.

O diretório de dados padrão do docker é ‘/var/lib/docker’ e é possível alterar facilmente o local de armazenamento padrão criando o arquivo ‘daemon.json’ para descrever qual o novo local que o docker irá armazenar seus arquivos.  Como fazer:

#### alterar para superusuário:
```
sudo su -
```


#### Para a execução do docker:
```
service docker stop
```

#### Editar o arquivo daemon.json:
```
vi /etc/docker/daemon.json
```

```
{ 
   "graph": "<novo diretório>" 
}
```

#### Copiar os arquivos para o novo local:
```
rsync -aP /var/lib/docker/ <novo diretório>
```

#### Criar um backup:
```
mv /var/lib/docker /var/lib/docker.old
```

#### Iniciar o docker:
```
service docker start
```

#### Validar alterações:
```
docker info | grep -i "Docker Root Dir:"
```

#### Se tudo estiver correto, apagar o backup:
```
rm -rf /var/lib/docker.old
```