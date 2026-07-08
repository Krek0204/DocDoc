import argparse
import os

import cv2
import numpy as np
import torch

from utils import load_model

def unwarp_img(ckpt_path, img_path, output_path):
    """
    Unwarp a document image using the model from ckpt_path.
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load model
    model = load_model(ckpt_path, device)
    model.to(device)
    model.eval()

    # Load image
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32) / 255
    inp = torch.from_numpy(img.transpose(2, 0, 1)).unsqueeze(0)

    # Make prediction
    inp = inp.to(device)
    unwarped = model(inp)
    unwarped = (unwarped[0].detach().cpu().numpy().transpose(1, 2, 0) * 255).astype(np.uint8)
    
    # Save result
    unwarped_BGR = cv2.cvtColor(unwarped, cv2.COLOR_RGB2BGR)
    cv2.imwrite(os.path.join(output_path, os.path.splitext(os.path.basename(img_path))[0] + "_unwarp.png"), unwarped_BGR)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--ckpt-path", type=str, default="./weights/best_model.pkl", help="Path to the model weights as pkl."
    )
    parser.add_argument("--img-path", type=str, default='./input/for_dewarping.png', help="Path to the document image to unwarp.")
    parser.add_argument("--output-path", type=str, default='./output' ,help="Path, where unwarped image will be saved.")

    args = parser.parse_args()

    unwarp_img(args.ckpt_path, args.img_path, args.output_path)
