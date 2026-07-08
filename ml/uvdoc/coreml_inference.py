import argparse
import coremltools as ct
import numpy as np
from PIL import Image
import matplotlib.pyplot as plt



def inference(model_path: str ,img_path: str, save_path: str):
    # Load mlpackage model
    model = ct.models.MLModel(model_path)
    
    # Load image
    img = Image.open(img_path)
    img_array = np.array(img, dtype=np.float32) / 255
    
    img_array = np.expand_dims(img_array.transpose(2, 0, 1), axis=0)
    input = {
        'x': img_array
    }
    
    pred = model.predict(input)
    img = pred['img']
    img = (img.squeeze(0).transpose(1, 2, 0) * 255).astype(np.uint8)
    pil_image = Image.fromarray(img)
    pil_image.save(save_path)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--img-path', type=str ,default='./input/for_dewarping.png')
    parser.add_argument('--save-path', type=str ,default='./output/coreml_inf.jpg')
    parser.add_argument('--model-path', type=str, default='./converted/model.mlpackage')
    
    args = parser.parse_args()
    
    inference(args.model_path, args.img_path, args.save_path)