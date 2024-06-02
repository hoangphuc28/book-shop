
import { Book } from "../utils/interfaces/book";
import { Card, CardActionArea, CardMedia, Typography, Rating, Button } from "@mui/material";
import { formatVND } from "../utils/formatCurrency";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Link from "next/link";
interface Props {
  product: Book
}
export default function CardItem({ product }: Props) {
  return (
    <div className="col-lg-4 col-sm-4">
      <Card sx={{ maxWidth: 300 }}>
      <Link href={`/products/${product?.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 250 }}
            image={product?.thumbnail}
            alt="green iguana"
          />
          <div className="px-4 mt-1">
            <Typography fontSize={16} gutterBottom variant="h5" component="div">
              {product?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.author?.name}
            </Typography>
            <Rating name="read-only" size="small" defaultValue={product?.rating} precision={0.5} readOnly />
            </div>
        </CardActionArea>
        </Link>
        <div className="flex justify-between items-center pl-4 pb-1">
        <Typography>
              {formatVND(product?.price)}
            </Typography>
            <Button>
              <AddShoppingCartOutlinedIcon />
            </Button>
        </div>
      </Card>
    </div>

  );
}
