

---
layout: post
title: "#DevOps Como mover o diretório de dados padrão do docker para outro local no Linux"
author: "Rafael Martins"
---

O diretório de dados padrão do docker é '/var/lib/docker'. Neste diretório todas as imagens, volumes, etc., são armazenadas e, ao longo do tempo, a capacidade  de armazenamento pode não atender a demanda necessária para a utilização do Docker em seu servidor. Uma alternativa neste caso é montar um disco somente para essa finalidade.

É possível alterar facilmente o local de armazenamento padrão do Docker criando o arquivo 'daemon.json' e descrever qual o novo local que o docker apontará. Você pode seguir as seguintes etapas:

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