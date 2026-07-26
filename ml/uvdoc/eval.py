import argparse
import os
import glob
import cv2
import numpy as np
import torch
import piq # For MS-SSIM
from skimage.metrics import peak_signal_noise_ratio #For PSNR
from tqdm import tqdm # For visualise progress of iterations

from utils import load_model


def infer_one_img(model, img_path, device='cpu'):
    """
    Inference one image with prepared model.
    """
    
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
    cv2.imwrite(img_path.replace('_in', '_pred'), unwarped_BGR)


def infer_all_img(ckpt_path: str, dir_path: str, device='cpu'):
    # Load model
    model = load_model(ckpt_path, device)
    model.to(device)
    model.eval()
    
    # infer images
    in_paths = glob.glob(os.path.join(dir_path, '*_in.*'))
    for elem in tqdm(in_paths):
        infer_one_img(model, elem, device)
    

def calc_ms_ssim(dir_path: str):
    """
    Function to calculate ms-ssim.
    
    args:
        dir_path - path to directory, which contains predicted and gt images specified with '_gt' and '_pred' prefix.
    
    returns:
        result of np.mean() function
    """
    
    ms_ssim = []
    if os.path.isdir(dir_path):
        gt_paths = glob.glob(os.path.join(dir_path, '*_gt.*'))
    else:
        raise ValueError("Path must be dir")
        
    for gt_path in tqdm(gt_paths):
        gt = cv2.imread(gt_path)
        pred = cv2.imread(gt_path.replace('_gt', '_pred'))
        
        gt = cv2.cvtColor(gt, cv2.COLOR_BGR2RGB)
        pred = cv2.cvtColor(pred, cv2.COLOR_BGR2RGB)
        
        if pred.shape != gt.shape:
            pred = cv2.resize(pred, (gt.shape[1], gt.shape[0]))

        pred_tensor = torch.from_numpy(pred.transpose(2, 0, 1)).unsqueeze(0).float() / 255
        gt_tensor = torch.from_numpy(gt.transpose(2, 0, 1)).unsqueeze(0).float() / 255
        ms_ssim.append(piq.multi_scale_ssim(pred_tensor, gt_tensor, data_range=1.).item())
    return np.mean(ms_ssim)


def calc_psnr(dir_path: str):
    """
    Function to calculate psnr. Uses skimage.metrics.
    
    args:
        dir_path - path to directory, which contains predicted and gt images specified with '_gt' and '_pred' prefix.
        
    returns:
        result of np.mean() function
    """
    
    psnr = []
    if os.path.isdir(dir_path):
        gt_paths = glob.glob(os.path.join(dir_path, '*_gt.*'))
    else:
        raise ValueError("Path must be dir")
    
    for gt_path in tqdm(gt_paths):
        gt = cv2.imread(gt_path)
        pred = cv2.imread(gt_path.replace('_gt', '_pred'))
        
        gt = cv2.cvtColor(gt, cv2.COLOR_BGR2RGB)
        pred = cv2.cvtColor(pred, cv2.COLOR_BGR2RGB)
        
        if pred.shape != gt.shape:
            pred = cv2.resize(pred, (gt.shape[1], gt.shape[0]))
            
        psnr.append(peak_signal_noise_ratio(pred, gt))
    
    return np.mean(psnr)

   
if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--model_path", type=str, default="./weights/best_model.pkl", help="Path to the model weights as pkl."
    )
    parser.add_argument(
        "--path", type=str, default='/Volumes/HDD2T/Datasets_Krek0204/eval_datasets/dir300'
    )
    
    args = parser.parse_args()
    
    device = "mps" if torch.mps.is_available() else "cpu"
    # infer_all_img(args.model_path, args.path, device)
    # ms_ssim = calc_ms_ssim(args.path)
    psnr = calc_psnr(args.path)
    print(f"Dir300 dataset\npsnr = {psnr}")
    
