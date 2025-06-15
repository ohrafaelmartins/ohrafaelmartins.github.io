#!/bin/bash

# Script para otimizar imagens para melhor performance no PageSpeed Insights

echo "🖼️  Otimizando imagens para melhor performance..."

# Verifica se as ferramentas estão instaladas
command -v cwebp >/dev/null 2>&1 || { echo "❌ cwebp não está instalado. Instale: brew install webp ou apt-get install webp"; exit 1; }
command -v convert >/dev/null 2>&1 || { echo "❌ ImageMagick não está instalado. Instale: brew install imagemagick ou apt-get install imagemagick"; exit 1; }

# Criar diretório para imagens otimizadas
mkdir -p optimized

# Otimizar capa-ebook.jpg
echo "📖 Otimizando capa-ebook.jpg..."
# Redimensionar para máximo 400px de largura
convert capa-ebook.jpg -resize 400x -quality 85 optimized/capa-ebook-optimized.jpg
# Converter para WebP
cwebp -q 85 optimized/capa-ebook-optimized.jpg -o optimized/capa-ebook.webp
echo "✅ capa-ebook otimizada"

# Otimizar turista-confuso.png
echo "🧳 Otimizando turista-confuso.png..."
# Redimensionar para máximo 600px de largura
convert turista-confuso.png -resize 600x -quality 85 optimized/turista-confuso-optimized.jpg
# Converter para WebP
cwebp -q 85 optimized/turista-confuso-optimized.jpg -o optimized/turista-confuso.webp
echo "✅ turista-confuso otimizada"

echo "🎉 Todas as imagens foram otimizadas!"
echo ""
echo "📊 Comparação de tamanhos:"
echo "Original vs Otimizada:"
if [ -f "capa-ebook.jpg" ]; then
    original_size=$(du -h capa-ebook.jpg | cut -f1)
    optimized_size=$(du -h optimized/capa-ebook.webp | cut -f1)
    echo "  capa-ebook.jpg: $original_size → $optimized_size"
fi

if [ -f "turista-confuso.png" ]; then
    original_size=$(du -h turista-confuso.png | cut -f1)
    optimized_size=$(du -h optimized/turista-confuso.webp | cut -f1)
    echo "  turista-confuso.png: $original_size → $optimized_size"
fi

echo ""
echo "📝 Próximos passos:"
echo "1. Substitua as imagens originais pelas versões otimizadas"
echo "2. Atualize o HTML para usar <picture> com fallbacks"
echo "3. Teste novamente no PageSpeed Insights" 