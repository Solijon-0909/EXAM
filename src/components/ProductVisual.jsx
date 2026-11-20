import { useState } from "react";
import Icon from "./Icon";

export default function ProductVisual({ product, size = 48 }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="product-visual">
      {product.image && !imageFailed ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Icon name={product.icon || "laptop"} size={size} strokeWidth={1.45} />
      )}
    </div>
  );
}
